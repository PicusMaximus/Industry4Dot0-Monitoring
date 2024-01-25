<script setup lang="ts">
// const props = defineProps<{}>()
</script>

<template>
  <ElHeader>
    <el-row class="row-bg" justify="space-between">
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">Links</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">Mitte</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">Rechts</div>
      </el-col>
    </el-row>
  </ElHeader>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
