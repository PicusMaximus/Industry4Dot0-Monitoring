export default defineTask({
  meta: {
    name: "device:ping",
    description: "Geräte anpingen die sich länger nicht gemeldet haben",
  },

  run({ payload }) {
    const { devicePort } = useRuntimeConfig();

    const now =
      typeof payload.scheduledTime === "number"
        ? payload.scheduledTime
        : Date.now();

    const inactiveDevices = db
      .selectDistinct({
        deviceIp: devices.ip,
        deviceId: devices.id,
      })
      .from(devices)
      .leftJoin(events, eq(devices.id, events.deviceId))
      .where(
        and(
          isNotNull(devices.ip),
          or(
            isNull(events.timestamp),
            lt(events.timestamp, new Date(now - 60 * 1000)),
          ),
        ),
      )
      .all();

    console.log(inactiveDevices);

    inactiveDevices.forEach(({ deviceIp, deviceId }) => {
      $fetch(`http://${deviceIp}:${devicePort}/api/device/getJobs`)
        .then(() => {
          insertEvent({
            timestamp: new Date(),
            deviceId,
            level: "info",
            message: "Gerät erfolgreich angepingt",
          });
        })
        .catch((error) => {
          insertEvent({
            timestamp: new Date(),
            deviceId,
            level: "error",
            message: "Gerät nicht erreichbar",
          });
        });
    });

    return { result: "Success" };
  },
});
