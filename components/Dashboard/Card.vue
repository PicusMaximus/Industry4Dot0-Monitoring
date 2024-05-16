<script setup lang="ts">
interface DashboardCardProps {
  name: string;
  type?: string;
  rows: DashboardCardRow[];
  showDetails?: boolean;
  showLogout?: boolean;
  logoutDisabled?: boolean;
}

interface DashboardCardRow {
  title: string;
  value: string;
}

interface DashboardCardEmits {
  (e: "openDetails"): void;
  (e: "logout"): void;
}

const { rows, name, type, showDetails, showLogout, logoutDisabled } =
  defineProps<DashboardCardProps>();
const emit = defineEmits<DashboardCardEmits>();
</script>

<template>
  <ElCard class="group">
    <template #header>
      <div class="flex justify-between">
        <span>
          {{ name }}
          <span class="font-bold" v-if="type">
            ({{ type.toLocaleUpperCase() }})
          </span>
        </span>
        <ElButton
          v-if="showDetails"
          class="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          type="primary"
          plain
          @click="$emit('openDetails')"
        >
          Details
        </ElButton>
        <ElButton
          v-if="showLogout"
          type="danger"
          @click="$emit('logout')"
          :disabled="logoutDisabled"
        >
          Gerät abmelden
        </ElButton>
      </div>
    </template>
    <div v-for="row in rows" :key="row.title">
      {{ row.title }}: {{ row.value }}
    </div>
  </ElCard>
</template>
