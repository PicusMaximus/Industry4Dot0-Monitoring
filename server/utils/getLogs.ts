import { SQL, getTableColumns } from "drizzle-orm";
import { z } from "zod";

export const logFiltersSchema = z.object({
  device: z.string().optional(),
  to: z.coerce.date().optional(),
  from: z.coerce.date().optional(),
});

export type LogFilters = z.infer<typeof logFiltersSchema>;

export const getLogs = (filters: LogFilters) => {
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
      deviceType: sql<string>`UPPER(${devices.type})`
    })
    .from(events)
    .leftJoin(devices, eq(devices.id, events.deviceId))
    .where(and(...filterSQLs));

  // console.log(eventsQuery.toSQL())
  return eventsQuery;
}
