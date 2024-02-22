export default defineEventHandler(async (event) => {
  return db
    .selectDistinct({
      jobId: events.jobId,
      status: sql<
        SelectEvent["level"]
      >`FIRST_VALUE(${events.level}) OVER (PARTITION BY ${events.jobId} ORDER BY ${events.timestamp} DESC)`,
    })
    .from(events)
    .where(isNotNull(events.jobId));
});
