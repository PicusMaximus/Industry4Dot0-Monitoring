<script lang="ts" setup>
const { data: devices, refresh: refreshDevices } = useFetch("/api/device");

const refreshInterval = useRefreshInterval();

useIntervalFn(refreshDevices, refreshInterval);
</script>

<template>
  <DashboardSection title="Geräte">
    <div v-if="devices?.length" class="grid gap-1 grid-cols-auto-fill-md">
      <DashboardCard
        v-for="(device, index) in devices"
        :key="index"
        :name="device.name"
        :type="device.type"
        :rows="[
          { title: 'IP', value: device.ip ?? '' },
          { title: 'Status', value: device.lastEventLevel },
        ]"
        showDetails
        @openDetails="() => $router.push(`/device/${device.id}`)"
      />
    </div>
    <div v-else class="flex justify-around">
      <p>Keine Geräte gefunden</p>
    </div>
  </DashboardSection>
</template>

<style>
.stopped-job {
  background-color: lightcoral;
}
</style>
