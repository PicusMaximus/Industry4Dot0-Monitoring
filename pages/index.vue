<script setup lang="ts">
useSeoMeta({
  title: "Übersicht",
});

definePageMeta({
  breadcrumb: "Übersicht",
});

const { data: devices, refresh: refreshDevices } = useFetch("/api/device");

useIntervalFn(refreshDevices, 1 * 1000);

const start = async () => {
  await $fetch("/api/actions/start");
};

const shutdown = async () => {
  await $fetch("/api/actions/stop");
};

const emergencyStop = async () => {
  await $fetch("/api/actions/emergency-stop");
};
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="grid grid-cols-1 gap-1 md:grid-cols-3">
      <ElButton type="success" @click="start">Start</ElButton>
      <ElButton type="warning" @click="shutdown">Herunterfahren</ElButton>
      <ElButton type="danger" @click="emergencyStop">Notstopp</ElButton>
    </div>
    <ElDivider />
    <div class="grid gap-1 grid-cols-auto-fill-md">
      <DeviceCard
        v-for="(device, index) in devices"
        :key="index"
        :device="device"
      />
    </div>
  </div>
</template>
