<script lang="ts" setup>
const { data } = useFetch("/api/device");

const add = async () => {
  const test = await $fetch("/api/device", {
    method: "POST",
  });
};
</script>

<template>
  <ElUpload>
    <ElIconPlus />
  </ElUpload>
</template>
