import { Device } from "~/interfaces/Device";

export default defineEventHandler<{
  body: Device;
}>(async (event) => {
  const device = await readBody(event);

  return null;
});
