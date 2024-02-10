<template>
  <div class="flex">
    <ElAside class="grid">
      <ElMenu>
        <ElMenuItem><NuxtLink to="/">Übersicht</NuxtLink></ElMenuItem>
        <ElMenuItem
          ><NuxtLink to="/settings">Einstellungen</NuxtLink></ElMenuItem
        >
        <ElMenuItem><NuxtLink to="/log">Ereignisse</NuxtLink></ElMenuItem>
      </ElMenu>
    </ElAside>
    <ElMain>
      <slot></slot>
    </ElMain>
  </div>
</template>
