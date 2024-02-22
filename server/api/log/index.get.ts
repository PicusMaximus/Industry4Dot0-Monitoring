import { LogFilters, getLogs, logFiltersSchema } from "~/server/utils/getLogs";

export default defineEventHandler<
  {
    query: LogFilters;
  },
  ReturnType<typeof getLogs>
>(async (event) => {
  const query = await getValidatedQuery(event, logFiltersSchema.parse);

  return getLogs(query);
});
