interface UseRefreshIntervalOptions {
  /**
   * The duration of inactivity required to consider the user as idle.
   */
  idleTimeout?: number;
  /**
   * The interval duration for refreshing data when the user is idle.
   */
  idleInterval?: number;
  /**
   * The interval duration for refreshing data when the user is active.
   */
  activeInterval?: number;
}

/**
 * Custom composable function that calculates the refresh interval based on the idle state.
 *
 * @param options - Optional configuration options for the refresh interval.
 * @returns The computed refresh interval based on the idle state.
 */
export const useRefreshInterval = (options?: UseRefreshIntervalOptions) => {
  const { idle } = useIdle(options?.idleTimeout);

  return computed(() => {
    if (idle.value) return options?.idleInterval ?? 10 * 1000;
    return options?.activeInterval ?? 2 * 1000;
  });
};
