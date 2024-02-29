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
