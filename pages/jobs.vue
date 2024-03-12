<script setup>
import draggable from "vuedraggable";

const { data: devices, refresh: refreshDevice } = await useFetch("/api/device");
const { data: jobs, refresh: refreshJobs } = await useFetch("/api/job");

const originalOrder = computed(() =>
  (jobs.value ?? [])
    .filter((job) => job.order !== null)
    .sort((a, b) => a.order - b.order)
    .map((job) => job.id),
);

const newOrder = ref(originalOrder.value);

watch(originalOrder, (value) => {
  newOrder.value = value;
});

const changedOrder = computed(() => {
  return (
    originalOrder.value.length !== newOrder.value.length ||
    originalOrder.value.some((id, index) => id !== newOrder.value[index])
  );
});

const selectedDevice = useRouteQuery("device", devices.value?.[0].id ?? "", {
  leaveDefault: true,
});

const filteredJobs = computed({
  get: () => {
    return jobs.value?.filter(
      (job) =>
        job.deviceId === selectedDevice.value &&
        !newOrder.value.includes(job.id),
    );
  },
  set: (value) => {
    console.log(value);
  },
});

const activeJobs = computed({
  get: () => {
    return newOrder.value
      .map((id) => jobs.value?.find((job) => job.id === id))
      .filter(Boolean);
  },
  set: (value) => {
    newOrder.value = value.map((job) => job.id);
  },
});

const saveOrder = async () => {
  await $fetch("/api/job/setOrder", {
    method: "POST",
    body: newOrder.value,
  });

  await refreshDevice();
  await refreshJobs();
};
</script>

<template>
  <div class="flex h-full w-full flex-col justify-stretch">
    <div class="flex justify-end p-5">
      <ElButton
        :disabled="!changedOrder"
        type="success"
        class="w-60"
        @click="saveOrder"
      >
        Speichern
      </ElButton>
    </div>
    <ElDivider class="m-0" />
    <div class="flex grow">
      <ElMenu class="w-96" :defaultActive="'SPS-1'">
        <ElMenuItem
          class="flex justify-center font-bold"
          v-for="device in devices"
          @click="selectedDevice = device.id"
          :style="{
            'background-color': stringToColour(device.id),
            color: getContrast(stringToColour(device.id)),
          }"
        >
          {{ device.name }}
        </ElMenuItem>
      </ElMenu>
      <div
        id="jobs-container"
        class="flex grow basis-0 flex-col items-center justify-start gap-2 pt-3"
      >
        <h1 class="font-bold">
          Verfügbare Jobs {{ `(${filteredJobs.length})` }}
        </h1>
        <draggable
          v-model="filteredJobs"
          tag="ul"
          :group="{ name: 'jobs' }"
          itemKey="job"
          class="flex w-96 grow flex-col gap-2"
        >
          <template #item="{ element: job }">
            <div :key="job">
              <JobOrderCard :job="job"></JobOrderCard>
            </div>
          </template>
        </draggable>
      </div>

      <ElDivider direction="vertical" class="h-full" />

      <div
        id="active-jobs-container"
        class="flex grow basis-0 flex-col items-center justify-start gap-2 pt-3"
      >
        <h1 class="font-bold">Aktive Jobs {{ `(${activeJobs.length})` }}</h1>
        <draggable
          v-model="activeJobs"
          tag="ul"
          :group="{ name: 'jobs' }"
          itemKey="activeJob"
          class="flex w-96 grow flex-col gap-2"
        >
          <template #item="{ element: job }">
            <JobOrderCard :job="job"></JobOrderCard>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>
