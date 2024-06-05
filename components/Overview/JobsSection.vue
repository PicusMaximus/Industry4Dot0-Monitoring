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
        :class="{
          'active-job': job.status === 'job-gestartet',
          'stopped-job': job.status === 'wartung-gestartet',
        }"
      />
    </div>
    <div v-else class="flex justify-around">
      <p>Keine aktiven Jobs</p>
    </div>
  </DashboardSection>
</template>

<style>
.active-job {
  background-color: lightgreen;
}
.stopped-job {
  background-color: lightcoral;
}
</style>
