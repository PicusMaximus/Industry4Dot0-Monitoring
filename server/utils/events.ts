import { SQL, getTableColumns } from "drizzle-orm";
import { z } from "zod";

export const eventFiltersSchema = z.object({
  device: z.string().optional(),
  to: z.coerce.date().optional(),
  from: z.coerce.date().optional(),
  limit: z.coerce.number().optional(),
});

export type EventFilters = z.infer<typeof eventFiltersSchema>;

export const getEvents = async (filters: EventFilters) => {
  const filterSQLs: SQL[] = [];

  if (filters.to) {
    filterSQLs.push(lte(events.timestamp, filters.to));
  }

  if (filters.from) {
    filterSQLs.push(gte(events.timestamp, filters.from));
  }

  if (filters.device) {
    filterSQLs.push(eq(events.deviceId, filters.device));
  }

  const eventsQuery = db
    .select({
      ...getTableColumns(events),
      deviceName: devices.name,
      deviceType: sql<string>`UPPER(${devices.type})`,
    })
    .from(events)
    .leftJoin(devices, eq(devices.id, events.deviceId))
    .where(and(...filterSQLs))
    .orderBy(desc(events.timestamp));

  if (filters.limit) {
    eventsQuery.limit(filters.limit);
  }

  return eventsQuery;
};

export type EventLogItem = Awaited<ReturnType<typeof getEvents>>[number];

export const insertEvent = async (event: InsertEvent) => {
  await db.insert(events).values([event]);
};
