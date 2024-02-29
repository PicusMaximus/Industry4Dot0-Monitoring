import { z } from "zod";

export const getJobs = async () => {
  return db
    .select({
      deviceId: devices.id,
      deviceName: devices.name,
      jobId: jobs.id,
      jobName: jobs.name,
    })
    .from(devices)
    .leftJoin(devices, eq(devices.id, devices.id))
    .where(isNotNull(devices.ip));
};

export const jobOrderSchema = z.array(insertJobSchema.shape.id);
export type JobOrder = z.infer<typeof jobOrderSchema>;

export const setJobOrder = async (order: JobOrder) => {
  console.log("Job order: ", order);
};
