import { z } from "zod";
import { SelectDevice } from "~/server/database/schemas/devices";

const deviceParamsSchema = insertDeviceSchema.pick({
  id: true,
});

export default defineEventHandler<
  {
    routerParams: z.infer<typeof deviceParamsSchema>;
  },
  Promise<SelectDevice>
>(async (event) => {
  const { id } = await getValidatedRouterParams(
    event,
    deviceParamsSchema.parse,
  );

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
