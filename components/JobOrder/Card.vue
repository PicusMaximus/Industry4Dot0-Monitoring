<script setup lang="ts">
const { job } = defineProps<{
  job: { id: string; name: string; deviceId: string };
}>();
</script>

<template>
  <ElCard
    class="box-card cursor-pointer"
    :style="{
      'background-color': stringToColour(job.deviceId),
      color: getContrast(stringToColour(job.deviceId)),
    }"
  >
    <div class="flex justify-center">
      <span>
        <span class="font-bold">{{ `${job.name}` }}</span>
      </span>
    </div>
  </ElCard>
</template>
