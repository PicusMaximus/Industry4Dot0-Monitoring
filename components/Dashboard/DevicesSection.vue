<script lang="ts" setup>
const { data: devices, refresh: refreshDevices } = useFetch("/api/device");

const refreshInterval = useRefreshInterval();

useIntervalFn(refreshDevices, refreshInterval);
</script>

<template>
  <DashboardSection title="Geräte">
    <div class="grid gap-1 grid-cols-auto-fill-md">
      <DashboardCard
        v-for="(device, index) in devices"
        :key="index"
        :name="device.name"
        :type="device.type"
        :rows="[{ title: 'IP', value: device.ip ?? '' }]"
        @openDetails="() => $router.push(`/device/${device.id}`)"
      />
    </div>
  </DashboardSection>
</template>
