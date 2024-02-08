export default defineEventHandler<{
  query: { id: string };
}>((event) => {
  const { id } = getQuery(event);
});
