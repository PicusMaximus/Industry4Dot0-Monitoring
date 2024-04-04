export default defineEventHandler(async (event) => {
  const devicesResult = db.select({ ip: devices.ip }).from(devices).all();

  devicesResult.forEach(async (device) => {
    try {
      await fetch(`http://${device.ip}:3000/api/device/stop`, {
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
  });
});
