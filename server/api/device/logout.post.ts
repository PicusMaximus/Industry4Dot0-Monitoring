import { z } from "zod";

const bodySchema = insertDeviceSchema.pick({
  id: true,
});

export default defineEventHandler<
  {
    body: z.infer<typeof bodySchema>;
  }
>(async (event) => {
  const { id } = await readValidatedBody(event, bodySchema.parse);

  logoutDevice(id);

});
