<template>
  <ElCard class="box-card">
    <template #header>
      <div class="flex justify-between">
        <span>Gerät 1</span>
        <ElButton type="warning" plain>Status abfragen</ElButton>
      </div>
    </template>
    <div v-for="i in 4" :key="i">{{ "List item " + i }}</div>
  </ElCard>
</template>
