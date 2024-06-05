<script lang="ts" setup>
useSeoMeta({
  title: "Details",
});
</script>

<template>
  <div class="flex flex-col gap-5 p-5">
    <DeviceDetailsSection />
    <DeviceJobsSection />
    <DeviceEventsSection />
  </div>
</template>
