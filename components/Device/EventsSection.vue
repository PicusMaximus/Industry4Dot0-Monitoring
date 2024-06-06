<script lang="ts" setup>
const route = useRoute();

// Query parameters for the API
const query = computed(() => ({
  device: route.params.id,
  limit: 10,
}));

const { data: events, refresh: refreshEvents } = useFetch("/api/log", {
  query,
});

const refreshInterval = useRefreshInterval();

useIntervalFn(refreshEvents, refreshInterval);
</script>

<template>
  <DashboardSection title="Ereignisse">
    <div class="flex flex-col gap-5">
      <ClientOnly>
        <EventLogTable v-if="events !== null" :data="events" />
        <template #fallback>
          <Loading />
        </template>
      </ClientOnly>
    </div>
  </DashboardSection>
</template>
