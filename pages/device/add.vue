<script lang="ts" setup>
const device = ref({})
const deviceIp = ref('');
const notFound = ref(false);

const deviceType = ref('')

async function fetchDevice() {
    const result = await $fetch(`/api/device/${deviceIp.value}`);
    if (result) {
        device.value = result;
        return;
    }
    notFound.value = true;
    setTimeout(() => {
        notFound.value = false;
    }, 5000)

}
</script>

<template>
    <div class="w-100">
        <h3>Gerät hinzufügen</h3>
        <ElInput v-model="deviceIp" placeholder="IP-Adresse">
            <template #prepend>
                <el-select v-model="deviceType" placeholder="Gerät-Art" style="width: 115px">
                    <el-option label="SPS" value="1" />
                    <el-option label="Dobot" value="2" />
                </el-select>
            </template>
            <template #append>
                <el-button @click="fetchDevice">Suchen</el-button>
            </template>
        </ElInput>
        <p @v-if="notFound" class="text-danger-600">Gerät nicht gefunden!</p>
        <div class="w-80 flex flex-col">
            <DeviceCard class="mt-5"></DeviceCard>
            <ElButton class="mt-5" type="primary">Gerät hinzufügen</ElButton>
        </div>
    </div>
</template>
