<script lang="ts" setup>
const route = useRoute();

const queryJobs = computed(() => ({
  device: route.params.id,
}));

const { data: jobs, refresh: refreshJobs } = useFetch("/api/job", {
  query: queryJobs,
});

const refreshInterval = useRefreshInterval();

useIntervalFn(refreshJobs, refreshInterval);
</script>

<template>
  <DashboardSection title="Verfügbare Jobs">
    <div v-if="jobs?.length" class="grid gap-1 grid-cols-auto-fill-md">
      <DashboardCard
        v-for="(job, index) in jobs"
        :key="index"
        :name="job.name"
        :rows="[
          {
            title: 'Position',
            value: String(job?.order !== null ? job?.order + 1 : '-'),
          },
        ]"
      />
    </div>
    <div v-else class="flex justify-around">
      <p>Keine aktiven Jobs</p>
    </div>
  </DashboardSection>
</template>
