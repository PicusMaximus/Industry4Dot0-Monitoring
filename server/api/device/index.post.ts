import {
  InsertDevice,
  insertDeviceSchema,
} from "~/server/database/schemas/devices";

export default defineEventHandler<
  {
    body: InsertDevice;
  },
  void
>(async (event) => {
  const newDevice = await readValidatedBody(event, insertDeviceSchema.parse);

  await db.insert(devices).values([newDevice]);
});
