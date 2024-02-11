import {
  InsertDevice,
  insertDeviceSchema,
} from "~/server/database/schemas/device";

export default defineEventHandler<{
  body: InsertDevice;
}>(async (event) => {
  const newDevice = await readValidatedBody(event, insertDeviceSchema.parse);

  await db.insert(devices).values([newDevice]);
});
