import { z } from "zod";

const bodySchema = insertEventSchema.omit({
  id: true,
});

export default defineEventHandler<
  {
    body: z.infer<typeof bodySchema>;
  },
  ReturnType<typeof insertEvent>
>(async (event) => {
  const newEvent = await readValidatedBody(event, bodySchema.parse);

  await insertEvent(newEvent);
});
