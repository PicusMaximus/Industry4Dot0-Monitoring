<script lang="ts" setup>
const { data: jobs, refresh: refreshJobs } = await useFetch("/api/job/active");

const refreshInterval = useRefreshInterval();

useIntervalFn(refreshJobs, refreshInterval);
</script>

<template>
  <DashboardSection title="Aktive Jobs">
    <div v-if="jobs?.length" class="grid gap-1 grid-cols-auto-fill-md">
      <DashboardCard
        v-for="(job, index) in jobs"
        :key="index"
        :name="job.jobName"
        :rows="[{ title: 'Gerät', value: job.deviceName }]"
      />
    </div>
    <div v-else class="flex justify-around">
      <p>Keine aktiven Jobs</p>
    </div>
  </DashboardSection>
</template>
