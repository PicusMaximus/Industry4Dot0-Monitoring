export default defineEventHandler((event) => {
    const ip = getRouterParam(event, 'ip')
    console.log(`Wir pingen, ${ip}!`)
  
    if (false) {
        return {ipAdress: ip, name: 'test'}
    }

    return null;
  })
  