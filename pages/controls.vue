<script setup lang="ts">
</script>

<template>
    <div class="flex flex-col gap-1">
        <div class="flex gap-1">
            <ElButton type="success">Start</ElButton>
            <ElButton type="warning">Herunterfahren</ElButton>
            <ElButton type="danger">Notstop</ElButton>
        </div>

        <div class="flex gap-1">
            <DeviceCard />
            <DeviceCard />
            <DeviceCard />
        </div>
    </div>
    <button class="btn btn-success">halgasgasgslo</button>
</template>