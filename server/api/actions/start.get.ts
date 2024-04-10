export default defineEventHandler(async (event) => {
  const { devicePort } = useRuntimeConfig();

  const devicesResult = db.select({ ip: devices.ip }).from(devices).all();

  return Promise.all(
    devicesResult.map(async (device) => {
      try {
        await fetch(`http://${device.ip}:${devicePort}/api/device/start`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(`Start sent to ${device.ip}`);
      } catch (error) {
        throw createError({
          message: "Start fehlgeschlagen!",
          cause: error,
        });
      }
    }),
  );
});
