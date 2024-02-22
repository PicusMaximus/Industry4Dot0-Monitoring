import { z } from "zod";
import { SelectDevice } from "~/server/database/schemas/devices";

const paramsSchema = insertDeviceSchema.pick({
  id: true,
});

export default defineEventHandler<
  {
    routerParams: z.infer<typeof paramsSchema>;
  },
  Promise<SelectDevice>
>(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramsSchema.parse);

  const device = (
    await db.select().from(devices).where(eq(devices.id, id)).limit(1)
  )[0];

  if (!device) {
    throw createError({
      message: "Device not found",
      status: 404,
    });
  }

  return device;
});
