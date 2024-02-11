import { InsertEvent } from "~/server/database/schemas/event";

export default defineEventHandler<{
  body: InsertEvent;
}>(async (event) => {
  const newEvent = await readValidatedBody(event, insertEventSchema.parse);

  await db.insert(events).values([newEvent]);
});
