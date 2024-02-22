<script setup lang="ts">
import type { SelectDevice } from "~/server/database/schemas/devices";

interface DeviceCardProps {
  device: SelectDevice;
}

const { device } = defineProps<DeviceCardProps>();
</script>

<template>
  <ElCard>
    <template #header>
      <div class="flex justify-between">
        <span>{{ device.name }}
          <span class="font-bold">({{ device.type.toLocaleUpperCase() }})</span></span>
        <ElButton type="primary" plain @click="$router.push(`/device/${device.id}`)">
          Details
        </ElButton>
      </div>
    </template>
    <div>IP-Adresse: {{ device.ip }}</div>
    <ElDivider />
    <ElButton type="warning" plain class="w-full"> Status abfragen </ElButton>
    <!--div>
      Status: {{ device.status }}
    </div-->
  </ElCard>
</template>
