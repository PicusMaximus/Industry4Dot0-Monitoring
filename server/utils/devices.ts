import { InsertDevice } from "../database/schemas/devices";

export const getDeviceById = (id: string) => {
  return (
    db.select().from(devices).where(eq(devices.id, id)).limit(1).get() ?? null
  );
};

export const getDevices = () => {
  return db.select().from(devices).where(isNotNull(devices.ip)).all();
};

export const insertDevice = async (device: InsertDevice) => {
  db.transaction((tx) => {
    if (!device.ip) {
      return;
    }

    tx.update(devices).set({ ip: null }).where(eq(devices.ip, device.ip)).run();

    tx.insert(devices)
      .values([device])
      .onConflictDoUpdate({
        target: devices.id,
        set: device,
      })
      .run();
  });
};
