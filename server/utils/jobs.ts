import { SQL, getTableColumns } from "drizzle-orm";
import { z } from "zod";
import { jobOrder, type InsertJob } from "../database/schemas/jobs";

export const jobFiltersSchema = z.object({
  device: z.string().optional(),
});

export type JobFilters = z.infer<typeof jobFiltersSchema>;

export const getJobs = (filters: JobFilters) => {
  const filterSQLs: SQL[] = [isNotNull(devices.ip), eq(jobs.deleted, false)];

  if (filters.device) {
    filterSQLs.push(eq(jobs.deviceId, filters.device));
  }

  const jobsQuery = db
    .selectDistinct({
      ...getTableColumns(jobs),
      order: jobOrder.order,
    })
    .from(jobs)
    .leftJoin(devices, eq(devices.id, devices.id))
    .leftJoin(jobOrder, eq(jobs.id, jobOrder.jobId))
    .where(and(...filterSQLs));

  return jobsQuery.all();
};

export const updateJobs = (deviceId: string, job: InsertJob[]) => {
  db.transaction((tx) => {
    tx.insert(jobs)
      .values(job)
      .onConflictDoUpdate({
        target: [jobs.id],
        set: {
          name: sql`excluded.name`,
          deviceId: sql`excluded.device_id`,
          deleted: false,
        },
      })
      .run();

    tx.update(jobs)
      .set({ deleted: true })
      .where(
        and(
          eq(jobs.deviceId, deviceId),
          notInArray(
            jobs.id,
            job.map((job) => job.id),
          ),
        ),
      )
      .run();

    if (!jobOrderValid()) {
      $fetch("/api/actions/emergency-stop");
    }
  });
};

export const jobOrderValid = () => {
  const deletedJobsInOrder = db
    .select({
      jobId: jobOrder.jobId,
    })
    .from(jobOrder)
    .leftJoin(jobs, eq(jobs.id, jobOrder.jobId))
    .where(eq(jobs.deleted, true))
    .all();

  return deletedJobsInOrder.length === 0;
};

export const jobOrderSchema = z.array(insertJobSchema.shape.id);
export type JobOrder = z.infer<typeof jobOrderSchema>;

export const setJobOrder = (order: JobOrder) => {
  db.delete(jobOrder).run();

  if (order.length === 0) return;

  db.insert(jobOrder)
    .values(order.map((jobId, order) => ({ jobId, order })))
    .run();
};

export const getActiveJobs = () => {
  const jobStatusQuery = db
    .selectDistinct({
      status: sql<
        SelectEvent["status"]
      >`FIRST_VALUE(${events.status}) OVER (PARTITION BY ${events.jobId} ORDER BY ${events.timestamp} DESC)`,
    })
    .from(events)
    .where(eq(events.jobId, jobs.id));

  return db
    .select({
      jobId: jobOrder.jobId,
      jobName: jobs.name,
      deviceName: devices.name,
      status: sql<SelectEvent["status"]>`${jobStatusQuery}`,
    })
    .from(jobOrder)
    .innerJoin(jobs, eq(jobs.id, jobOrder.jobId))
    .innerJoin(devices, eq(jobs.deviceId, devices.id))
    .where(isNotNull(jobOrder.order))
    .orderBy(jobOrder.order)
    .all();
};

const getDeviceDetails = (order: JobOrder) => {
  const orFilters: SQL[] = [isNotNull(jobOrder.order)];

  if (order.length) {
    orFilters.push(inArray(jobs.id, order));
  }

  return db
    .select({
      id: jobs.id,
      name: jobs.name,
      deviceIp: devices.ip,
    })
    .from(jobs)
    .leftJoin(devices, eq(jobs.deviceId, devices.id))
    .leftJoin(jobOrder, eq(jobs.id, jobOrder.jobId))
    .where(
      and(or(...orFilters), isNotNull(devices.ip), eq(jobs.deleted, false)),
    )
    .all() as { id: string; name: string; deviceIp: string }[];
};

const getJobOrder = () => {
  return db
    .select({
      jobId: jobOrder.jobId,
    })
    .from(jobOrder)
    .orderBy(jobOrder.order)
    .all()
    .map((row) => row.jobId);
};

export const sendJobOrder = async (order?: JobOrder, deviceIp?: string) => {
  if (!order) {
    order = getJobOrder();
  }

  const {
    public: { devicePort },
  } = useRuntimeConfig();

  const jobDetails = getDeviceDetails(order);

  let jobOrderRequests = jobDetails
    .map((jobDetail) => {
      const orderIndex = order.indexOf(jobDetail.id);

      const nextJobId = order[(orderIndex + 1) % order.length] ?? null;
      const nextDeviceIp =
        jobDetails.find((jobDetail) => jobDetail.id === nextJobId)?.deviceIp ??
        null;

      return {
        deviceIp: jobDetail.deviceIp,
        data: {
          jobId: jobDetail.id,
          name: jobDetail.name,
          nextJobId,
          nextDeviceIp,
        },
      };
    })
    .filter((request) => request.data.nextDeviceIp !== null);

  if (deviceIp) {
    jobOrderRequests = jobOrderRequests.filter(
      (request) => request.deviceIp === deviceIp,
    );
  }

  console.log(jobOrderRequests);

  try {
    await Promise.all(
      jobOrderRequests.map(async (request) => {
        if (!request.deviceIp) return;

        await $fetch(
          `http://${request.deviceIp}:${devicePort}/api/device/setJobOrder`,
          {
            method: "POST",
            body: request.data,
          },
        );
      }),
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send job order to devices", { cause: error });
  }
};
