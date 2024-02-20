<script setup lang="ts">
import type { SelectDevice } from "~/server/database/schemas/devices";

interface DeviceCardProps {
  device: SelectDevice;
}

const { device } = defineProps<DeviceCardProps>();
</script>

<template>
  <ElCard class="box-card">
    <template #header>
      <div class="flex justify-between">
        <span>{{ device.name }}</span>
        <ElButton
          type="warning"
          plain
          @click="$router.push(`/device/${device.id}`)"
        >
          Status abfragen
        </ElButton>
      </div>
    </template>
    <div>IP-Adresse: {{ device.ip }}</div>
    <el-divider />
    <!--div>
      Status: {{ device.status }}
    </div-->
  </ElCard>
</template>
