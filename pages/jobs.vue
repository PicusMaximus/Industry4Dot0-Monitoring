<script setup>
import { useStorage } from "@vueuse/core";
import draggable from "vuedraggable";

const { data: devices, refresh: refreshDevices } = useFetch("/api/device");
const activeDevices = ref([]);
const changedOrder = ref(false);

useIntervalFn(refreshDevices, 1 * 500);

function saveActiveDevices() {
  activeDevicesStorage.value = activeDevices.value;
  console.log(activeDevicesStorage.value);
}

// testweise localstorage. jobs sollten dann später direkt vom gerät geholt und angezeigt werden
let activeDevicesStorage;
onMounted(() => {
  activeDevicesStorage = useStorage("active-devices", [], localStorage, {
    mergeDefaults: true,
  });
  activeDevices.value = JSON.parse(JSON.stringify(activeDevicesStorage.value));
});
</script>

<template>
  <div class="flex justify-end">
    <ElButton
      @click="saveActiveDevices"
      :disabled="!changedOrder"
      type="success"
      class="w-60"
      >Speichern</ElButton
    >
  </div>
  <ElDivider />
  <div class="flex justify-around">
    <div
      id="devices-container"
      class="flex h-full w-full flex-col items-center justify-center"
    >
      <h1 class="font-bold">Verfügbare Jobs {{ `(${devices.length})` }}</h1>
      <draggable
        v-model="devices"
        tag="ul"
        :group="{ name: 'devices', pull: 'clone' }"
        itemKey="device"
      >
        <template #item="{ element: device }">
          <DeviceCardJobs class="w-96" :device="device" :key="device.id" />
        </template>
      </draggable>
    </div>

    <ElDivider direction="vertical" class="h-full" style="height: 100vh" />

    <div
      id="active-devices-container"
      class="flex h-full w-full flex-col items-center justify-start"
    >
      <h1 class="font-bold">Aktive Jobs {{ `(${activeDevices.length})` }}</h1>
      <draggable
        @change="changedOrder = true"
        v-model="activeDevices"
        tag="ul"
        :group="{ name: 'devices' }"
        itemKey="activeDevice"
        style="min-height: 100vh"
      >
        <template #item="{ element: device }">
          <DeviceCardJobs class="w-96" :device="device" :key="device.id" />
        </template>
      </draggable>
    </div>
  </div>
</template>
