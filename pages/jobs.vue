<template>
  <draggable v-model="testarray" item-key="id">
    <template #item="{ element }">
      <div> {{ element }} </div>
    </template>
    <template #header>
      <button @click="() => console.log('add')">Add</button>
    </template>
  </draggable>
</template>
<script setup lang="ts">
const { data: devices, refresh: refreshDevices } = useFetch("/api/device");
useIntervalFn(refreshDevices, 1 * 1000);

const testarray = ["test1", "test2", "test3"]
</script>