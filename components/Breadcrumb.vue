<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const breadcrumb = computed(() => {
  const pathParts = route.fullPath.replace(/\/$/, "").split("/");

  return pathParts
    .map((_part, index) => {
      const path = pathParts.slice(0, index + 1).join("/") || "/";

      const route = router.resolve(path);

      if (typeof route.meta.breadcrumb !== "string") {
        return null;
      }

      return {
        text: route.meta.breadcrumb,
        to: route.href,
      };
    })
    .filter(Boolean);
});
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in breadcrumb" :to="item.to">
      {{ item.text }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
