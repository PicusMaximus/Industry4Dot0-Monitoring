<script lang="ts" setup>
useSeoMeta({
  title: "Ereignisse",
});

definePageMeta({
  breadcrumb: "Ereignisse",
});

const timeShortcuts = [
  {
    text: "Today",
    value: new Date(),
  },
  {
    text: "Yesterday",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    },
  },
  {
    text: "A week ago",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    },
  },
];

// Route query parameters
const searchQuery = useRouteQuery("search", "");

const deviceQuery = useRouteQuery("device", "");

const fromQuery = useRouteQuery<Date | undefined>("from", undefined, {
  parse: (value) => (value ? new Date(value) : undefined),
  serialize: (value) => (value ? value.toISOString() : undefined),
});

const toQuery = useRouteQuery<Date | undefined>("to", undefined, {
  parse: (value) => (value ? new Date(value) : undefined),
  serialize: (value) => (value ? value.toISOString() : undefined),
});

// Query parameters for the API
const query = computed(() => ({
  device: deviceQuery.value,
  from: fromQuery.value?.toISOString(),
  to: toQuery.value?.toISOString(),
}));

const { data: events, refresh: refreshEvents } = useFetch("/api/log", {
  query,
});

const refreshInterval = useRefreshInterval();

useIntervalFn(refreshEvents, refreshInterval);

// Define a computed property to filter events based on the search query
const filteredEvents = computed(() => {
  if (!events.value) return [];
  // console.log(events.value);
  if (!searchQuery.value) return events.value;

  const query = searchQuery.value.toLowerCase().trim();

  return events.value.filter(
    (event) =>
      event.deviceName?.toLowerCase().includes(query) ||
      event.deviceType?.toLowerCase().includes(query) ||
      event.message?.toLowerCase().includes(query) ||
      event.level?.toLowerCase().includes(query),
  );
});
</script>

<template>
  <div class="p-5">
    <div class="mb-2">
      <ElText class="mx-1" size="large">Ereignisse</ElText>
    </div>
    <ClientOnly>
      <div class="flex gap-1">
        <ElInput
          v-model="searchQuery"
          placeholder="Sucheparameter"
          clearable
          :prefixIcon="ElIconSearch"
          size="large"
        />
        <ElDatePicker
          v-model="fromQuery"
          type="datetime"
          placeholder="Startzeit"
          :shortcuts="timeShortcuts"
          size="large"
          format="DD.MM.YYYY HH:mm"
        />
        <ElDatePicker
          v-model="toQuery"
          type="datetime"
          placeholder="Endzeit"
          :shortcuts="timeShortcuts"
          size="large"
          format="DD.MM.YYYY HH:mm"
        />
      </div>
      <EventLogTable :data="filteredEvents" />
      <template #fallback>
        <Loading />
      </template>
    </ClientOnly>
  </div>
</template>
