<script setup lang="ts">
import type { SelectDevice } from "~/server/database/schemas/device";

interface DeviceCardProps {
    device: SelectDevice;
}

const { device } = defineProps<DeviceCardProps>();
</script>

<template>
    <ElCard class="box-card">
        <div class="flex justify-center">
            <span><span class="font-bold">{{ `${device.name}` }}</span>{{ ` (${device.ip})` }}</span>
        </div>
    </ElCard>
</template>
