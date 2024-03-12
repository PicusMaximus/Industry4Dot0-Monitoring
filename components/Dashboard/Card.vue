<script setup lang="ts">
interface DashboardCardProps {
  name: string;
  type: string;
  rows: DashboardCardRow[];
}

interface DashboardCardRow {
  title: string;
  value: string;
}

interface DashboardCardEmits {
  (e: "openDetails"): void;
}

const { rows, name, type } = defineProps<DashboardCardProps>();
const emit = defineEmits<DashboardCardEmits>();
</script>

<template>
  <ElCard class="group">
    <template #header>
      <div class="flex justify-between">
        <span>
          {{ name }}
          <span class="font-bold">({{ type.toLocaleUpperCase() }})</span>
        </span>
        <ElButton
          class="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          type="primary"
          plain
          @click="$emit('openDetails')"
        >
          Details
        </ElButton>
      </div>
    </template>
    <div v-for="row in rows" :key="row.title">
      {{ row.title }}: {{ row.value }}
    </div>
  </ElCard>
</template>
