import { SQL, getTableColumns } from "drizzle-orm";
import { z } from "zod";
import { jobOrder, type InsertJob } from "../database/schemas/jobs";

export const getJobs = () => {
  return db
    .selectDistinct({
      ...getTableColumns(jobs),
      order: jobOrder.order,
    })
    .from(jobs)
    .leftJoin(devices, eq(devices.id, devices.id))
    .leftJoin(jobOrder, eq(jobs.id, jobOrder.jobId))
    .where(isNotNull(devices.ip))
    .all();
};

export const insertJobs = (job: InsertJob[]) => {
  db.insert(jobs).values(job).run();
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
    .where(and(or(...orFilters), isNotNull(devices.ip)))
    .all() as { id: string; name: string; deviceIp: string }[];
};

export const sendJobOrder = async (order: JobOrder) => {
  const { devicePort } = useRuntimeConfig();

  const jobDetails = getDeviceDetails(order);

  const jobOrderRequests = jobDetails.map((jobDetail) => {
    const orderIndex = order.indexOf(jobDetail.id);

    const nextJobId = order[orderIndex + 1] ?? null;
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
  });

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
    throw new Error("Failed to send job order to devices", { cause: error });
  }
};
