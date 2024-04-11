export const useAsync = <T extends unknown>(
  fn: () => Promise<T>,
  options: {
    onError?: (error: unknown) => void;
  },
) => {
  const pending = ref<boolean>(false);

  return {
    pending,
    async execute() {
      pending.value = true;

      try {
        return await fn();
      } catch (error) {
        if (options.onError) {
          options.onError(error);
        }
      } finally {
        pending.value = false;
      }
    },
  };
};
