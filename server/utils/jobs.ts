import { getTableColumns } from "drizzle-orm";
import { z } from "zod";
import { jobOrder } from "../database/schemas/jobs";

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

export const jobOrderSchema = z.array(insertJobSchema.shape.id);
export type JobOrder = z.infer<typeof jobOrderSchema>;

export const setJobOrder = (order: JobOrder) => {
  db.delete(jobOrder).run();

  if (order.length === 0) return;

  db.insert(jobOrder)
    .values(order.map((jobId, order) => ({ jobId, order })))
    .run();
};
