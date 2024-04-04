export default defineEventHandler(async (event) => {
  const devicesResult = db.select({ ip: devices.ip }).from(devices).all();

  devicesResult.forEach(async (device) => {
    try {
      await fetch(`http://${device.ip}:3000/api/device/notstop`, {
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
  });
});
