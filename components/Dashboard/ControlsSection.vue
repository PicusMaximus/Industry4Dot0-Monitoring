<script lang="ts" setup>
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
  <DashboardSection title="Steuerung">
    <div class="grid grid-cols-1 gap-1 md:grid-cols-3">
      <ElButton type="success" @click="start">Start</ElButton>
      <ElButton type="warning" @click="shutdown">Herunterfahren</ElButton>
      <ElButton type="danger" @click="emergencyStop">Notstopp</ElButton>
    </div>
  </DashboardSection>
</template>
