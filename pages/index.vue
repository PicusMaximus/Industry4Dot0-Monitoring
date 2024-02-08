<script setup lang="ts">
import { type Device } from '../interfaces/Device';

useSeoMeta({
  title: "Steuerung",
  description: "Steuerung der Geräte",
  robots: "noindex, nofollow",
});

const geraeteItems = ref<Device[]>([
  { ipAdress: '0.0.0.0', name: 'Gerät 1', status: 'Aktiv' },
  { ipAdress: '1.0.0.0', name: 'Gerät 2', status: 'Inaktiv' },
  { ipAdress: '2.0.0.0', name: 'Gerät 3', status: 'Aktiv' },
  { ipAdress: '3.0.0.0', name: 'Gerät 4', status: 'Idle', }
]);

</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="grid grid-cols-1 gap-1 md:grid-cols-3">
      <ElButton type="success">Start</ElButton>
      <ElButton type="warning">Herunterfahren</ElButton>
      <ElButton type="danger">Notstop</ElButton>
    </div>
    <div class="grid gap-1 grid-cols-auto-fill-md">
      <DeviceCard v-for="(geraet, index) in geraeteItems" :key="index" :geraet="geraet" />
    </div>
  </div>
</template>
