import { z } from "zod";

const paramsSchema = insertDeviceSchema.pick({
  id: true,
});

export default defineEventHandler<
  {
    routerParams: z.infer<typeof paramsSchema>;
  },
  Promise<ReturnType<typeof getDeviceById>>
>(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramsSchema.parse);

  const device = getDeviceById(id);

  if (!device) {
    throw createError({
      message: "Device not found",
      status: 404,
    });
  }

  return device;
});
