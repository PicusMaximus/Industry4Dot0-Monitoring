export default defineEventHandler(async (event) => {
  const {
    public: { devicePort },
  } = useRuntimeConfig();

  const devicesResult = db.select({ ip: devices.ip }).from(devices).all();

  return Promise.all(
    devicesResult.map(async (device) => {
      try {
        await fetch(`http://${device.ip}:${devicePort}/api/device/stop`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(`Stop sent to ${device.ip}`);
      } catch (error) {
        throw createError({
          message: "Stop fehlgeschlagen!",
          cause: error,
        });
      }
    }),
  );
});
