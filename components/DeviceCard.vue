<script setup lang="ts">
import type { SelectDevice } from "~/server/database/schemas/devices";

interface DeviceCardProps {
  device: SelectDevice;
}

enum DeviceType {
  "SPS" = 1,
  "Dobot" = 2
}

const { device } = defineProps<DeviceCardProps>();
</script>

<template>
  <ElCard class="box-card">
    <template #header>
      <div class="flex justify-between">
        <span>{{ device.name }} <span class="font-bold">{{ `(${DeviceType[device.type]})` }}</span></span>
        <ElButton type="primary" plain @click="$router.push(`/device/${device.id}`)">
          Details
        </ElButton>
      </div>
    </template>
    <div>IP-Adresse: {{ device.ip }}</div>
    <ElDivider />
    <ElButton type="warning" plain class="w-64">
      Status abfragen
    </ElButton>
    <!--div>
      Status: {{ device.status }}
    </div-->
  </ElCard>
</template>
