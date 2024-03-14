import { SQL, getTableColumns } from "drizzle-orm";
import { z } from "zod";
import { InsertJob, jobOrder } from "../database/schemas/jobs";

export const jobFiltersSchema = z.object({
  device: z.string().optional(),
});

export type JobFilters = z.infer<typeof jobFiltersSchema>;

export const getJobs = (filters: JobFilters) => {
  const filterSQLs: SQL[] = [isNotNull(devices.ip)];

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
