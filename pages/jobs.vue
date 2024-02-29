<script setup>
import { useStorage } from "@vueuse/core";
import draggable from "vuedraggable";

const { data: devices, refresh: refreshDevices } = useFetch("/api/device");
const route = useRoute();
const router = useRouter();

const jobs = ref([]);
const activeJobs = ref([]);

const changedOrder = ref(false);

const stringToColour = (str) => {
  let hash = 0;
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += value.toString(16).padStart(2, "0");
  }
  return colour;
};

devices.value?.forEach((device) => {
  console.log(stringToColour(device.id));
  device = { ...device, color: stringToColour(device.id) };
});

const jobsObject = {
  deviceId: "ace32c00-7720-45ce-b457-bf99dfc09337",
  jobs: [
    {
      name: "Arm um 180° nach rechts drehen",
      id: "ace32c00-7720-45ce-b457-bf99dfc09337",
    },
    {
      name: "Arm um 180° nach links drehen",
      id: "ace32c00-7720-45ce-b457-bf99dfc09337",
    },
  ],
};

useIntervalFn(refreshDevices, 1000);

function saveActiveJobs() {
  activeJobsStorage.value = activeJobs.value;
  console.log(activeJobsStorage.value);
}

function getJobs(id) {
  router.replace({ query: { ...route.query, device: id } });
  jobs.value = jobsObject.jobs;
}

let activeJobsStorage;
onMounted(() => {
  activeJobsStorage = useStorage("active-jobs", [], localStorage, {
    mergeDefaults: true,
  });
  activeJobs.value = JSON.parse(JSON.stringify(activeJobsStorage.value));
});
</script>

<template>
  <div class="flex flex-col justify-stretch">
    <div class="flex justify-end p-5">
      <ElButton
        @click="saveActiveJobs"
        :disabled="!changedOrder"
        type="success"
        class="w-60"
      >
        Speichern
      </ElButton>
    </div>
    <ElDivider class="m-0" />
    <div class="flex justify-start">
      <ElMenu class="w-96" :defaultActive="'SPS-1'">
        <ElMenuItem
          @click="() => getJobs(device.id)"
          v-for="device in devices"
          :style="{ 'background-color': device.color }"
        >
          {{ device.name }}
        </ElMenuItem>
      </ElMenu>
      <div
        id="jobs-container"
        class="flex h-full w-full flex-col items-center justify-start pt-3"
      >
        <h1 class="font-bold">Verfügbare Jobs {{ `(${jobs.length})` }}</h1>
        <draggable
          v-model="jobs"
          tag="ul"
          :group="{ name: 'jobs', put: 'false' }"
          itemKey="job"
        >
          <template #item="{ element: job }">
            <div :key="job">
              <JobCard :job="job"></JobCard>
            </div>
          </template>
        </draggable>
      </div>

      <ElDivider direction="vertical" class="h-full" style="height: 100vh" />

      <div
        id="active-jobs-container"
        class="flex h-full w-full flex-col items-center justify-start pt-3"
      >
        <h1 class="font-bold">Aktive Jobs {{ `(${activeJobs.length})` }}</h1>
        <draggable
          @change="changedOrder = true"
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
