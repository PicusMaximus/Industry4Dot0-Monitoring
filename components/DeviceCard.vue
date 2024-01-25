<script setup lang="ts">
</script>

<template>
    <ElCard class="box-card" padd >
        <template #header>
            <div class="card-header">
                <span>Gerät 1</span>
                <ElButton type="warning" plain>Status abfragen</ElButton>
            </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
    </ElCard>
</template>