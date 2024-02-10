export default defineEventHandler<{
  routerParams: {
    ip: string;
  };
}>((event) => {
  const ip = getRouterParam(event, "ip");

  return null;
});
