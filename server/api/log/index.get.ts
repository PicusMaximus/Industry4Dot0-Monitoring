export default defineEventHandler<
  {
    query: EventFilters;
  },
  ReturnType<typeof getEvents>
>(async (event) => {
  const query = await getValidatedQuery(event, eventFiltersSchema.parse);

  return getEvents(query);
});
