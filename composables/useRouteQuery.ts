import type {
  LocationQueryRaw,
  LocationQueryValue,
  LocationQueryValueRaw,
} from "vue-router";

const parseValue = <Value = LocationQueryValue>(
  value: LocationQueryValue,
  defaultValue: Value,
  parse?: (value: LocationQueryValue) => Value,
) => {
  if (value === null) {
    return defaultValue;
  }

  return parse ? parse(value) : (value as Value);
};

const serializeValue = <Value = LocationQueryValue>(
  value: Value,
  defaultValue: Value,
  serialize: (value: Value) => LocationQueryValueRaw = String,
  leaveDefault = false,
) => {
  if (value === defaultValue && !leaveDefault) {
    return undefined;
  }

  const serializedValue = serialize(value);

  return serializedValue;
};

interface UseRouteQueryOptions<Value = LocationQueryValue> {
  /**
   * A function to parse the query parameter value.
   *
   * @param value - The query parameter value.
   * @returns The parsed value.
   */
  parse?: (value: LocationQueryValue) => Value;
  /**
   * A function to serialize the query parameter value.
   *
   * @param value - The query parameter value.
   * @returns The serialized value.
   */
  serialize?: (value: Value) => LocationQueryValueRaw;
  /**
   * Whether to leave the default value as is when serializing it.
   */
  leaveDefault?: boolean;
}

/**
 * Custom composable function that provides reactive access to a specific query parameter in the current route.
 *
 * @param queryParam - The name of the query parameter.
 * @param defaultValue - The default value for the query parameter.
 * @param options - Optional configuration options for the query parameter.
 * @returns A computed ref that represents the reactive query parameter value.
 */
export const useRouteQuery = <Value = LocationQueryValue>(
  queryParam: string,
  defaultValue: Value,
  options?: UseRouteQueryOptions<Value>,
) => {
  const router = useRouter();
  const route = useRoute();

  return computed<Value>({
    get: () => {
      const value = route.query[queryParam];
      const stringValue = Array.isArray(value) ? value.join() : value ?? null;

      return parseValue(stringValue, defaultValue, options?.parse);
    },
    set: (value) => {
      const stringValue = serializeValue(
        value,
        defaultValue,
        options?.serialize,
        options?.leaveDefault,
      );

      const query: LocationQueryRaw = {
        ...route.query,
        [queryParam]: stringValue,
      };

      router.push({ query });
    },
  });
};
