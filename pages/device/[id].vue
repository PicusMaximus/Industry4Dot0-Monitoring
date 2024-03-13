<script lang="ts" setup>
useSeoMeta({
  title: "Details",
});

definePageMeta({
  breadcrumb: "Details",
});

const route = useRoute();

const { data: device, refresh: refreshDevice } = useFetch(
  `/api/device/${route.params.id}`,
);

// Query parameters for the API
const query = computed(() => ({
  device: route.params.id,
  limit: 10,
}));

const { data: events, refresh: refreshEvents } = useFetch("/api/log", {
  query,
});

const refreshInterval = useRefreshInterval();

useIntervalFn(refreshDevice, refreshInterval);

useIntervalFn(refreshEvents, refreshInterval);
</script>

<template>
  <div class="mb-2">
    <ElText class="mx-1" size="large">Details: {{ device?.name }}</ElText>
  </div>
  <ElDivider />
  <div class="mb-2">
    <ElText class="mx-1" size="large">Ereignisse</ElText>
  </div>
  <ClientOnly>
    <EventLogTable v-if="events !== null" :data="events" />
    <template #fallback>
      <Loading />
    </template>
  </ClientOnly>
</template>
