<script setup lang="ts">
import type { TableInstance } from "element-plus";
import type { Serialize } from "nitropack";
import type { EventLogItem } from "~/server/utils/events";

interface EventLogTableProps {
  data: Serialize<EventLogItem>[];
}

const props = defineProps<EventLogTableProps>();

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

const tableRef = ref<TableInstance>();

const clearFilter = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  tableRef.value!.clearFilter();
};

const filterDeviceType = (value: string, row: Serialize<EventLogItem>) => {
  return row.deviceType === value;
};
const filterLogLevel = (value: string, row: Serialize<EventLogItem>) => {
  return row.level === value;
};
</script>

<template>
  <el-button @click="clearFilter">Spaltenfilter zurücksetzen</el-button>

  <ElTable
    ref="tableRef"
    :data="data"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    max-height="680"
  >
    <ElTableColumn prop="deviceName" label="Gerät" sortable />
    <ElTableColumn
      prop="deviceType"
      label="Gerätetyp"
      sortable
      :filters="[
        { text: 'SPS', value: 'SPS' },
        { text: 'DOBOT', value: 'DOBOT' },
      ]"
      :filter-method="filterDeviceType"
      filter-placement="bottom-end"
    />
    <ElTableColumn prop="jobName" label="Job" />
    <ElTableColumn prop="status" label="Status" />
    <ElTableColumn prop="message" label="Nachricht" />
    <ElTableColumn
      prop="level"
      label="Log-Level"
      sortable
      :filters="[
        { text: 'Info', value: 'info' },
        { text: 'Warning', value: 'warning' },
        { text: 'Error', value: 'error' },
        { text: 'Debug', value: 'debug' },
      ]"
      :filter-method="filterLogLevel"
      filter-placement="bottom-end"
    />
    <ElTableColumn
      :formatter="
        (row: Serialize<EventLogItem>) =>
          new Date(row.timestamp).toLocaleString()
      "
      label="Zeitpunkt"
      sortable
    />
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
