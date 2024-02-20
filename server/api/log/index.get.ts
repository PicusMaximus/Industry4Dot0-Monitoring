import { SQL } from "drizzle-orm";
import { z } from "zod";
import { SelectEvent } from "~/server/database/schemas/events";

const eventQuerySchema = z.object({
  to: z.coerce.date().optional(),
  from: z.coerce.date().optional(),
});

export default defineEventHandler<
  {
    query: z.infer<typeof eventQuerySchema>;
  },
  Promise<SelectEvent[]>
>(async (event) => {
  const query = await getValidatedQuery(event, eventQuerySchema.parse);
  const filters: SQL[] = [];

  if (query.to) {
    filters.push(lte(events.timestamp, query.to));
  }

  if (query.from) {
    filters.push(gte(events.timestamp, query.from));
  }

  const eventsQuery = db
    .select()
    .from(events)
    .where(and(...filters));

  return eventsQuery;
});
