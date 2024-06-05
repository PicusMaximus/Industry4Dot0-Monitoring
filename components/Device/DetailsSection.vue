<script lang="ts" setup>
const route = useRoute();

const { data: device, refresh: refreshDevice } = useFetch(
  computed(() => `/api/device/${route.params.id}` as "/api/device/:id"),
);

const { execute: logout, pending: logoutPending } = useAsync(
  async () => {
    const id = route.params.id;
    await $fetch("/api/device/logout", {
      method: "POST",
      retry: false,
      body: {
        id,
      },
    });
  },
  {
    onError: (error) => {
      ElNotification({
        message: "Fehler beim Abmelden",
        type: "error",
      });
    },
    onSuccess: () => {
      ElNotification({
        message: "Abmelden erfolgreich",
        type: "success",
      });
    },
  },
);

const refreshInterval = useRefreshInterval();

useIntervalFn(refreshDevice, refreshInterval);

const {
  public: { devicePort },
} = useRuntimeConfig();

const interfaceUrl = computed(() => `http://${device.value?.ip}:${devicePort}`);

const openInterface = () => {
  console.log("Open interface", interfaceUrl.value);

  window.open(interfaceUrl.value, "_blank")?.focus();
};
</script>

<template>
  <DashboardSection title="Details">
    <DashboardCard
      v-if="device"
      :name="device.name"
      :type="device.type"
      :rows="[
        { title: 'Name', value: device.name },
        { title: 'Gerätetyp', value: device.type.toUpperCase() },
        { title: 'IP-Adresse', value: device.ip ?? '-' },
        { title: 'ID', value: device.id },
      ]"
      showLogout
      showOpenInterface
      @logout="logout"
      @openInterface="openInterface"
      :logoutDisabled="logoutPending"
    />
    <Loading v-else />
  </DashboardSection>
</template>
