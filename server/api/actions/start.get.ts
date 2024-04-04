export default defineEventHandler(async (event) => {
  const devicesResult = db.select({ ip: devices.ip }).from(devices).all();

  devicesResult.forEach(async (device) => {
    try {
      await fetch(`http://${device.ip}:3000/api/device/start`, {
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
  });
});
