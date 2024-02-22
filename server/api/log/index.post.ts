import { z } from "zod";

const bodySchema = insertEventSchema.omit({
  id: true,
});

export default defineEventHandler<{
  body: z.infer<typeof bodySchema>;
}>(async (event) => {
  const newEvent = await readValidatedBody(event, bodySchema.parse);

  await db.insert(events).values([newEvent]);
});
