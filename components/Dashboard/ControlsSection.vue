<script lang="ts" setup>
const { execute: start, pending: startPending } = useAsync(
  async () => {
    await $fetch("/api/actions/start", { retry: false });
  },
  {
    onError: (error) => {
      ElNotification({
        message: "Fehler beim Starten",
        type: "error",
      });
    },
    onSuccess: () => {
      ElNotification({
        message: "Start erfolgreich",
        type: "success",
      });
    },
  },
);

const { execute: stop, pending: stopPending } = useAsync(
  async () => {
    await $fetch("/api/actions/stop", { retry: false });
  },
  {
    onError: (error) => {
      ElNotification({
        message: "Fehler beim Herunterfahren",
        type: "error",
      });
    },
    onSuccess: () => {
      ElNotification({
        message: "Herunterfahren erfolgreich",
        type: "success",
      });
    },
  },
);

const { execute: emergencyStop, pending: emergencyStopPending } = useAsync(
  async () => {
    await $fetch("/api/actions/emergency-stop", { retry: false });
  },
  {
    onError: (error) => {
      ElNotification({
        message: "Fehler beim Notstopp",
        type: "error",
      });
    },
    onSuccess: () => {
      ElNotification({
        message: "Notstopp erfolgreich",
        type: "success",
      });
    },
  },
);

const loading = computed(
  () => startPending.value || stopPending.value || emergencyStopPending.value,
);
</script>

<template>
  <DashboardSection title="Steuerung">
    <div class="grid grid-cols-1 gap-1 md:grid-cols-2">
      <ElButton type="success" @click="() => start()" :disabled="loading">
        Start
      </ElButton>
      <ElButton
        type="danger"
        @click="() => emergencyStop()"
        :disabled="loading"
      >
        Notstopp
      </ElButton>
    </div>
  </DashboardSection>
</template>
