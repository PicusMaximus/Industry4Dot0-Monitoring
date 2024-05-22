<script lang="ts" setup>
useSeoMeta({
  title: "Details",
});

definePageMeta({
  breadcrumb: "Details",
});

const route = useRoute();

const { data: device, refresh: refreshDevice } = useFetch(
  computed(() => `/api/device/${route.params.id}` as "/api/device/:id"),
);

// Query parameters for the API
const query = computed(() => ({
  device: route.params.id,
  limit: 10,
}));

const { data: events, refresh: refreshEvents } = useFetch("/api/log", {
  query,
});

const queryJobs = computed(() => ({
  device: route.params.id,
}));

const { data: jobs, refresh: refreshJobs } = useFetch("/api/job", {
  query: queryJobs,
});

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

useIntervalFn(refreshEvents, refreshInterval);

useIntervalFn(refreshJobs, refreshInterval);

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
  <div class="flex flex-col gap-5 p-5" v-if="device">
    <DashboardSection title="Details">
      <DashboardCard
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
    </DashboardSection>

    <DashboardSection title="Verfügbare Jobs">
      <div v-if="jobs?.length" class="grid gap-1 grid-cols-auto-fill-md">
        <DashboardCard
          v-for="(job, index) in jobs"
          :key="index"
          :name="job.name"
          :rows="[
            {
              title: 'Position',
              value: String(job?.order ? job?.order + 1 : '-'),
            },
          ]"
        />
      </div>
      <div v-else class="flex justify-around">
        <p>Keine aktiven Jobs</p>
      </div>
    </DashboardSection>

    <DashboardSection title="Ereignisse">
      <div class="flex flex-col gap-5">
        <ClientOnly>
          <EventLogTable v-if="events !== null" :data="events" />
          <template #fallback>
            <Loading />
          </template>
        </ClientOnly>
      </div>
    </DashboardSection>
  </div>
  <template v-else>
    <Loading />
  </template>
</template>
