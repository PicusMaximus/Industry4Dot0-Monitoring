<script lang="ts" setup>
const { data: devices, refresh: refreshDevices } = useFetch("/api/device");

const refreshInterval = useRefreshInterval();

useIntervalFn(refreshDevices, refreshInterval);
</script>

<template>
  <Section title="Geräte">
    <div class="grid gap-1 grid-cols-auto-fill-md">
      <DeviceCard v-for="(device, index) in devices" :key="index" :device="device" />
    </div>
  </Section>
</template>
