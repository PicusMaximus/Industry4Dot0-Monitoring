import { InsertDevice } from "../database/schemas/devices";

export const getDeviceById = async (id: string) => {
  const device = await db
    .select()
    .from(devices)
    .where(eq(devices.id, id))
    .limit(1);

  return device[0] ?? null;
};

export const getDevices = async () => {
  return db.select().from(devices).where(isNotNull(devices.ip));
};

export const insertDevice = async (device: InsertDevice) => {
  await db.insert(devices).values([device]);
};
