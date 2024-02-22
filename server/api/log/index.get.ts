import { SQL, getTableColumns } from "drizzle-orm";
import { z } from "zod";
import { SelectEvent } from "~/server/database/schemas/events";

const querySchema = z.object({
  device: z.string().optional(),
  to: z.coerce.date().optional(),
  from: z.coerce.date().optional(),
});

export default defineEventHandler<
  {
    query: z.infer<typeof querySchema>;
  },
  Promise<SelectEvent[]>
>(async (event) => {
  const query = await getValidatedQuery(event, querySchema.parse);
  const filters: SQL[] = [];

  if (query.to) {
    filters.push(lte(events.timestamp, query.to));
  }

  if (query.from) {
    filters.push(gte(events.timestamp, query.from));
  }

  if (query.device) {
    filters.push(eq(events.deviceId, query.device));
  }

  const eventsQuery = db
    .select({
      ...getTableColumns(events),
      deviceName: devices.name,
      deviceType: devices.type
    })
    .from(events)
    .leftJoin(devices, eq(devices.id, events.deviceId))
    .where(and(...filters));

  // console.log(eventsQuery.toSQL())
  return eventsQuery;
});
