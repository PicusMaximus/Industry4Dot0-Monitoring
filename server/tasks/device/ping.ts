import { z } from "zod";

const jobsResponseSchema = z
  .object({
    jobs: z.array(
      insertJobSchema.omit({
        deviceId: true,
      }),
    ),
  })
  .or(
    z.array(z.tuple([z.string(), z.string()])).transform((jobs) => ({
      jobs: jobs.map((job) => ({
        id: job[0],
        name: job[1],
      })),
    })),
  );

export default defineTask({
  meta: {
    name: "device:ping",
    description: "Geräte anpingen die sich länger nicht gemeldet haben",
  },

  run({ payload }) {
    const { devicePort } = useRuntimeConfig();

    const now = Date.now();

    const allDevices = db
      .select({
        deviceIp: devices.ip,
        deviceId: devices.id,
      })
      .from(devices)
      .all();

    console.log(allDevices);

    let jobsResponse;

    allDevices.forEach(({ deviceIp, deviceId }) => {
      $fetch(`http://${deviceIp}:${devicePort}/api/device/getJobs`)
        .then((jobsResponse) => {
          const deviceJobs = jobsResponseSchema
            .parse(jobsResponse)
            .jobs.map((job) => ({
              ...job,
              deviceId: deviceId,
            }));

          console.log({ deviceJobs });

          updateJobs(deviceId, deviceJobs);
        })
        .catch((error) => {
          insertEvent({
            timestamp: new Date(),
            deviceId,
            level: "error",
            message: "Gerät nicht erreichbar",
          });
        });
    });

    return { result: "Success" };
  },
});
