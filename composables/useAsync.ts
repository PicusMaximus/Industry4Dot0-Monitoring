export const useAsync = <T extends unknown>(
  fn: () => Promise<T>,
  options: {
    onError?: (error: unknown) => void;
    onSuccess?: (result: T) => void;
  },
) => {
  const pending = ref<boolean>(false);

  return {
    pending,
    async execute() {
      pending.value = true;

      try {
        const result = await fn();

        if (options.onSuccess) {
          options.onSuccess(result);
        }

        return result;
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
