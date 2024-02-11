<script setup lang="ts">
import type { Device } from "~/interfaces/Device";

interface DeviceCardProps {
  geraet: Device;
}

const { geraet } = defineProps<DeviceCardProps>();
</script>

<template>
  <ElCard class="box-card">
    <template #header>
      <div class="flex justify-between">
        <span>{{ geraet.name }}</span>
        <ElButton
          type="warning"
          plain
          @click="$router.push(`/device/${geraet.id}`)"
        >
          Status abfragen
        </ElButton>
      </div>
    </template>
    <div>IP-Adresse: {{ geraet.ip }}</div>
    <el-divider />
    <!--div>
      Status: {{ geraet.status }}
    </div-->
  </ElCard>
</template>
