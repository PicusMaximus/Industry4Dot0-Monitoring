import { getTableColumns } from "drizzle-orm";
import { type InsertDevice } from "../database/schemas/devices";
import { type InsertEvent } from "../database/schemas/events";

export const getDeviceById = (id: string) => {
  return (
    db.select().from(devices).where(eq(devices.id, id)).limit(1).get() ?? null
  );
};

export const getDevices = () => {
  return db
    .select({
      ...getTableColumns(devices),
      lastEventLevel: sql<InsertEvent["level"]>`COALESCE(${db
        .select({
          level: events.level,
        })
        .from(events)
        .where(eq(events.deviceId, devices.id))
        .orderBy(desc(events.timestamp))
        .limit(1)}, 'info')`,
    })
    .from(devices)
    .where(isNotNull(devices.ip))
    .all();
};

export const insertDevice = (device: InsertDevice) => {
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

export const logoutDevice = (deviceId: string) => {
  db.transaction((tx) => {
    if (!deviceId) {
      return;
    }

    tx.update(devices).set({ ip: null }).where(eq(devices.id, deviceId)).run();
  });
};
