import { jobFiltersSchema, type JobFilters } from "~/server/utils/jobs";

export default defineEventHandler<
  {
    query: JobFilters;
  },
  Promise<ReturnType<typeof getJobs>>
>(async (event) => {
  const query = await getValidatedQuery(event, jobFiltersSchema.parse);

  return getJobs(query);
});
