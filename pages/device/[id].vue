<script lang="ts" setup>
useSeoMeta({
  title: "Details",
});

definePageMeta({
  breadcrumb: "Details",
});

const route = useRoute();

const { data: device, refresh: refreshDevice } = useFetch(
  `/api/device/${route.params.id}`,
);

const refreshInterval = useRefreshInterval();

useIntervalFn(refreshDevice, refreshInterval);
</script>

<template>Details {{ device?.name }}</template>
