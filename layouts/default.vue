<template>
  <div class="flex">
    <ElAside class="grid">
      <ElMenu router :defaultActive="$route.path">
        <ElMenuItem index="/">Übersicht</ElMenuItem>
        <ElMenuItem index="/settings">Einstellungen</ElMenuItem>
        <ElMenuItem index="/log">Ereignisse</ElMenuItem>
      </ElMenu>
    </ElAside>
    <ElMain>
      <slot></slot>
    </ElMain>
  </div>
</template>
