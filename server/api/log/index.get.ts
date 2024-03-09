export default defineEventHandler<
  {
    query: EventFilters;
  },
  Promise<ReturnType<typeof getEvents>>
>(async (event) => {
  const query = await getValidatedQuery(event, eventFiltersSchema.parse);

  return getEvents(query);
});
