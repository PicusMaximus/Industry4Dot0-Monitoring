<script lang="ts" setup>
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <ElDivider>{{ props.title }}</ElDivider>
  <slot />
</template>
