<script setup lang="ts">
useSeoMeta({
  title: "Übersicht",
});
</script>

<template>
  <div class="flex flex-col gap-5 p-5">
    <OverviewControlsSection />
    <OverviewDevicesSection />
    <OverviewJobsSection />
  </div>
</template>
