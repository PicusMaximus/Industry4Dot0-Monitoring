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
    name: "jobs:refresh",
    description: "Aktualisiert die Jobs aller angemeldeten Geräte",
  },

  run({ payload }) {
    const {
      public: { devicePort },
    } = useRuntimeConfig();

    const now = Date.now();

    const allDevices = db
      .select({
        deviceIp: devices.ip,
        deviceId: devices.id,
      })
      .from(devices)
      .where(isNotNull(devices.ip))
      .all();

    console.log(allDevices);

    allDevices.forEach(({ deviceIp, deviceId }) => {
      $fetch(`http://${deviceIp}:${devicePort}/api/device/getJobs`)
        .then((jobsResponse) => {
          const deviceJobs = jobsResponseSchema
            .parse(jobsResponse)
            .jobs.map((job) => ({
              ...job,
              deviceId: deviceId,
            }));

          updateJobs(deviceId, deviceJobs);

          insertEvent({
            timestamp: new Date(),
            deviceId,
            level: "info",
            message: "Jobs aktualisiert",
          });
        })
        .catch((error) => {
          console.error(error);

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
