export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const deviceId = body.id;
    const deviceName = body.name;
    console.log(deviceId, deviceName)
    return 200
  })