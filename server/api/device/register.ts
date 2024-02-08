import { devices } from "~/server/database/schemas/device";
import { db } from "../../database/database";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const deviceId = body.id;
    const deviceName = body.name;

    return db.select().from(devices)
  })