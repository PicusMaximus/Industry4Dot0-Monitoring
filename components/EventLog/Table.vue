<script setup lang="ts">
import type { Serialize } from "nitropack";
import type { EventLogItem } from "~/server/utils/events";

interface EventLogTableProps {
  data: Serialize<EventLogItem>[];
}

const { data } = defineProps<EventLogTableProps>();

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: EventLogItem;
  rowIndex: number;
}) => {
  if (row.level === "warning") {
    return "warning-row";
  } else if (row.level === "error") {
    return "error-row";
  }
  return "";
};
</script>

<template>
  <ElTable :data="data" style="width: 100%" :row-class-name="tableRowClassName">
    <ElTableColumn prop="deviceName" label="Gerät" sortable />
    <ElTableColumn prop="deviceType" label="Gerätetyp" sortable />
    <ElTableColumn prop="message" label="Nachricht" />
    <ElTableColumn prop="level" label="Log-Level" sortable />
    <ElTableColumn prop="timestamp" label="Zeitpunkt" sortable />
  </ElTable>
</template>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-5);
}
.el-table .error-row {
  --el-table-tr-bg-color: var(--el-color-error-light-5);
}
</style>
