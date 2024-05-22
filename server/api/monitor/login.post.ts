import { z } from "zod";

const bodySchema = insertDeviceSchema.required({
  ip: true,
});

export default defineEventHandler<
  {
    body: z.infer<typeof bodySchema>;
  },
  ReturnType<typeof insertDevice>
>(async (event) => {
  const {
    public: { devicePort },
  } = useRuntimeConfig();

  const newDevice = await readValidatedBody(event, bodySchema.parse);

  insertDevice(newDevice);

  runTask("device:ping");

  console.log({ newDevice, devicePort });
});
