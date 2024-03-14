import { JobFilters, jobFiltersSchema } from "~/server/utils/jobs";

export default defineEventHandler<
  {
    query: JobFilters;
  },
  ReturnType<typeof getJobs>
>(async (event) => {
  const query = await getValidatedQuery(event, jobFiltersSchema.parse);

  return getJobs(query);
});
