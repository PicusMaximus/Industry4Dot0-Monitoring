import { SQL, getTableColumns } from "drizzle-orm";
import { z } from "zod";

export const eventFiltersSchema = z.object({
  device: z.string().optional(),
  to: z.coerce.date().optional(),
  from: z.coerce.date().optional(),
  limit: z.coerce.number().optional(),
});

export type EventFilters = z.infer<typeof eventFiltersSchema>;

export const getEvents = (filters: EventFilters) => {
  const filterSQLs: SQL[] = [ne(events.level, "debug")];

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
      jobName: jobs.name,
    })
    .from(events)
    .leftJoin(devices, eq(devices.id, events.deviceId))
    .leftJoin(jobs, eq(jobs.id, events.jobId))
    .where(and(...filterSQLs))
    .orderBy(desc(events.timestamp));

  if (filters.limit) {
    eventsQuery.limit(filters.limit);
  }

  return eventsQuery.all();
};

export type EventLogItem = Awaited<ReturnType<typeof getEvents>>[number];

export const insertEvent = (event: InsertEvent) => {
  if (event.level === "error") {
    // STOPPPPPPPP
    $fetch("/api/actions/emergency-stop").then(() =>
      console.log("Wegen Error Emergency-Stop"),
    );
  }

  db.insert(events).values([event]).run();
};
