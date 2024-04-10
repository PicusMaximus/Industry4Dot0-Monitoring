export default defineEventHandler(async (event) => {
  const { devicePort } = useRuntimeConfig();

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
});
