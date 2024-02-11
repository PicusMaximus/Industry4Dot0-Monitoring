<script lang="ts" setup>
useSeoMeta({
  title: "Details",
});

definePageMeta({
  breadcrumb: "Details",
});

const route = useRoute();
</script>

<template>Details {{ route.params.id }}</template>
