export default defineEventHandler<{
  routerParams: {
    ip: string;
  };
}>(async (event) => {
  const ip = getRouterParam(event, "ip");

  if (!ip) {
    return new Response("IP is required", { status: 400 });
  }

  const device = (
    await db.select().from(devices).where(eq(devices.ip, ip)).limit(1)
  )[0];

  if (!device) {
    return new Response("Device not found", { status: 404 });
  }

  return device;
});
