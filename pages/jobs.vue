<script setup>
import draggable from "vuedraggable";

const { data: devices } = await useFetch("/api/device");
const { data: jobs } = await useFetch("/api/job");

const originalOrder = jobs.value
  ?.filter((job) => job.order)
  .sort((a, b) => a.order - b.order)
  .map((job) => job.id);

const newOrder = ref(originalOrder);

const changedOrder = computed(() => {
  return (
    originalOrder.length !== newOrder.value.length ||
    originalOrder.some((id, index) => id !== newOrder.value[index])
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
};
</script>

<template>
  <div class="flex flex-col justify-stretch">
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
    <div class="flex justify-start">
      <ElMenu class="w-96" :defaultActive="'SPS-1'">
        <ElMenuItem
          v-for="device in devices"
          @click="selectedDevice = device.id"
          :style="{ 'background-color': stringToColour(device.id) }"
        >
          {{ device.name }}
        </ElMenuItem>
      </ElMenu>
      <div
        id="jobs-container"
        class="flex h-full w-full flex-col items-center justify-start pt-3"
      >
        <h1 class="font-bold">
          Verfügbare Jobs {{ `(${filteredJobs.length})` }}
        </h1>
        <draggable
          v-model="filteredJobs"
          tag="ul"
          :group="{ name: 'jobs' }"
          itemKey="job"
        >
          <template #item="{ element: job }">
            <div :key="job">
              <JobCard :job="job"></JobCard>
            </div>
          </template>
        </draggable>
      </div>

      <ElDivider direction="vertical" class="h-[100vh]" />

      <div
        id="active-jobs-container"
        class="flex h-full w-full flex-col items-center justify-start pt-3"
      >
        <h1 class="font-bold">Aktive Jobs {{ `(${activeJobs.length})` }}</h1>
        <draggable
          v-model="activeJobs"
          tag="ul"
          :group="{ name: 'jobs' }"
          itemKey="activeJob"
          style="min-height: 100vh"
        >
          <template #item="{ element: job }">
            <JobCard :job="job"></JobCard>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>
