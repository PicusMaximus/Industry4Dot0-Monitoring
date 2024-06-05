export const emergencyStop = async () => {
  const {
    public: { devicePort },
  } = useRuntimeConfig();

  const devicesResult = db.select({ ip: devices.ip }).from(devices).all();

  return Promise.all(
    devicesResult.map(async (device) => {
      try {
        await fetch(`http://${device.ip}:${devicePort}/api/device/notstop`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(`Emergency-Stop sent to ${device.ip}`);
      } catch (error) {
        throw createError({
          message: "Emergency-Stop fehlgeschlagen!",
          cause: error,
        });
      }
    }),
  );
};

export const start = async () => {
  if (!jobOrderValid()) {
    throw createError({
      message: "Aktuelle Job-Reihenfolge enthält ungültige Jobs!",
    });
  }

  const {
    public: { devicePort },
  } = useRuntimeConfig();

  const firstJob = db
    .select({
      deviceIp: devices.ip,
      jobId: jobs.id,
    })
    .from(jobOrder)
    .innerJoin(jobs, eq(jobs.id, jobOrder.jobId))
    .innerJoin(devices, eq(devices.id, jobs.deviceId))
    .orderBy(asc(jobOrder.order))
    .limit(1)
    .get();

  if (!firstJob) {
    throw createError({
      message: "Kein Job aktiv!",
    });
  }

  if (!firstJob.deviceIp) {
    throw createError({
      message: "Keine IP-Adresse für das Gerät gefunden!",
    });
  }

  console.log(`Starting job ${firstJob.jobId} on ${firstJob.deviceIp}`);

  try {
    await sendJobOrder(undefined, firstJob.deviceIp);

    await $fetch(
      `http://${firstJob.deviceIp}:${devicePort}/api/device/startJob`,
      {
        method: "POST",
        body: {
          id: firstJob.jobId,
        },
      },
    );
    console.log(`Start sent to ${firstJob.deviceIp}`);
  } catch (error) {
    throw createError({
      message: "Start fehlgeschlagen!",
      cause: error,
    });
  }
};
