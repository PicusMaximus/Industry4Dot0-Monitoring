<template>
  <div class="flex">
    <ElAside class="grid">
      <ElMenu router :defaultActive="$route.path">
        <ElMenuItem index="/">Übersicht</ElMenuItem>
        <ElMenuItem index="/jobs">Jobs</ElMenuItem>
        <ElMenuItem index="/log">Ereignisse</ElMenuItem>
      </ElMenu>
    </ElAside>
    <ElMain class="p-0">
      <slot></slot>
    </ElMain>
  </div>
</template>
