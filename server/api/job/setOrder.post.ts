export default defineEventHandler<{
  body: JobOrder;
}>(async (event) => {
  const jobOrder = await readValidatedBody(event, jobOrderSchema.parse);

  const jobDetails = jobOrder.length
    ? db
        .select({
          id: jobs.id,
          deviceIp: devices.ip,
        })
        .from(jobs)
        .leftJoin(devices, eq(jobs.deviceId, devices.id))
        .where(inArray(jobs.id, jobOrder))
        .all()
    : [];

  const jobOrderRequests = jobOrder.map((job, index) => ({
    jobId: job,
    nextJobId: jobOrder[index + 1],
    nextDeviceIp: jobDetails.find(
      (jobDetail) => jobDetail.id === jobOrder[index + 1],
    )?.deviceIp,
  }));

  console.log(jobOrderRequests);

  setJobOrder(jobOrder);
});
