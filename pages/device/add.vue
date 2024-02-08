<script lang="ts" setup>
const device = ref({})
const deviceIp = ref('');

function fetchDevice() {
    fetch(`http://${deviceIp.value}`)
        .then(response => response.json())
        .then(data => {
            device.value = data;
            console.log(device.value)
        });
}
</script>

<template>
    <div class="flex h-screen">
        <div class="m-auto">
            <h3>Gerät hinzufügen</h3>
            <ElInput v-model="deviceIp" type="success" placeholder="IP-Adresse">
                <template #append>
                    <el-button @click="fetchDevice" type="success">Suchen</el-button>
                </template>
            </ElInput>
        </div>
    </div>
    <DeviceCard></DeviceCard>
</template>
