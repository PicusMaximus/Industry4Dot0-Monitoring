export default defineEventHandler(async (event) => {
  return db.select().from(devices).where(isNotNull(devices.ip));
});
