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

const queryJobs = computed(() => ({
  device: route.params.id,
}));

const { data: jobs, refresh: refreshJobs } = useFetch("/api/job", {
  query: queryJobs,
});

console.log(toValue(jobs));
console.log(toValue(device));

const refreshInterval = useRefreshInterval();

useIntervalFn(refreshDevice, refreshInterval);

useIntervalFn(refreshEvents, refreshInterval);

useIntervalFn(refreshJobs, refreshInterval);
</script>

<template>
  <div class="mb-2">
    <div class="mb-2">
      <ElText class="mx-1" size="large">Details:</ElText>
    </div>
    <ul>
      <li>
        <ElText class="mx-1" size="large">Name: {{ device?.name }}</ElText>
      </li>
      <li>
        <ElText class="mx-1" size="large">
          Gerätetyp: {{ device?.type.toUpperCase() }}
        </ElText>
      </li>
      <li>
        <ElText class="mx-1" size="large">IP-Adresse: {{ device?.ip }}</ElText>
      </li>
      <li></li>
      <ElText class="mx-1" size="large">ID: {{ device?.id }}</ElText>
    </ul>
  </div>

  <ElDivider />

  <div class="mb-2">
    <template v-if="jobs && jobs.length">
      <div class="mb-2">
        <ElText class="mx-1" size="large">Jobs:</ElText>
      </div>
      <ul>
        <li v-for="(job, index) in jobs" :key="index">
          <ElText class="mx-1" size="large">- {{ job.name }}</ElText>
        </li>
      </ul>
    </template>
    <template v-else>
      <ElText class="mx-1" size="large">Keine Jobs verfügbar</ElText>
    </template>
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
