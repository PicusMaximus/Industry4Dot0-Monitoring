export default defineEventHandler<{
  body: JobOrder;
}>(async (event) => {
  const jobs = await readValidatedBody(event, jobOrderSchema.parse);

  await setJobOrder(jobs);
});
