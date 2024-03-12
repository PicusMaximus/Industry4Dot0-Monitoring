export default defineEventHandler<{
  body: JobOrder;
}>(async (event) => {
  const jobOrder = await readValidatedBody(event, jobOrderSchema.parse);

  await sendJobOrder(jobOrder);

  setJobOrder(jobOrder);
});
