<script setup lang="ts">
useSeoMeta({
  title: "Übersicht",
});

definePageMeta({
  breadcrumb: "Übersicht",
});
</script>

<template>
  <div class="flex flex-col gap-5">
    <ControlsSection />
    <DevicesSection />
  </div>
</template>
