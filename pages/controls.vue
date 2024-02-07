<script setup>
useSeoMeta({
  title: "Steuerung",
  description: "Steuerung der Geräte",
  robots: "noindex, nofollow",
});
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="grid grid-cols-1 gap-1 md:grid-cols-3">
      <ElButton type="success">Start</ElButton>
      <ElButton type="warning">Herunterfahren</ElButton>
      <ElButton type="danger">Notstop</ElButton>
    </div>

    <div class="grid gap-1 grid-cols-auto-fill-md">
      <DeviceCard />
      <DeviceCard />
      <DeviceCard />
      <DeviceCard />
    </div>
  </div>
</template>
