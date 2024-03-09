import { z } from "zod";

const bodySchema = insertDeviceSchema.required({
  ip: true,
});

const jobsResponseSchema = z.object({
  jobs: z.array(
    insertJobSchema.omit({
      deviceId: true,
    }),
  ),
});

export default defineEventHandler<
  {
    body: z.infer<typeof bodySchema>;
  },
  ReturnType<typeof insertDevice>
>(async (event) => {
  const newDevice = await readValidatedBody(event, bodySchema.parse);

  let jobsResponse;

  try {
    jobsResponse = await $fetch(
      `http://${newDevice.ip}:3000/api/device/getJobs`,
    );
  } catch (e) {
    throw new Error("Device is not reachable");
  }

  const deviceJobs = jobsResponseSchema.parse(jobsResponse).jobs.map((job) => ({
    ...job,
    deviceId: newDevice.id,
  }));

  insertDevice(newDevice);
  insertJobs(deviceJobs);
});
