<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';

useSeoMeta({
  title: "Ereignisse",
});

definePageMeta({
  breadcrumb: "Ereignisse",
});

const { data: events, refresh: refreshEvents } = useFetch("/api/log");

useIntervalFn(refreshEvents, 1 * 1000);

const loading = ref(events ? false : true);

// watchEffect(() => console.log(events.value?.[0]))

// Define a ref to hold the search query
const searchQuery = ref('');

// Define a computed property to filter events based on the search query
const filteredEvents = computed(() => {
  if (!events.value) return [];
  const query = searchQuery.value.toLowerCase().trim();
  return events.value.filter(event =>
    event.message.toLowerCase().includes(query)
  );
});

</script>

<style></style>

<template>
  <div style="margin-bottom: 16px;">
    <el-text class="mx-1" size="large">Ereignisse</el-text>
  </div>
  <el-input v-model="searchQuery" placeholder="Sucheparameter" clearable :prefix-icon="Search" size="large"
    style="width: 50%;" />
  <el-table v-if="events" v-loading="loading" :data="filteredEvents ?? events" style="width: 100%" stripe>
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="message" label="Nachricht" sortable />
  </el-table>
</template>

