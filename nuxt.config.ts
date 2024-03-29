import { createResolver } from "nuxt/kit";

const resolver = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@vueuse/nuxt", "@element-plus/nuxt", "@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  tailwindcss: {
    cssPath: false,
  },
  elementPlus: {
    importStyle: false,
  },
  nitro: {
    experimental: {
      openAPI: true,
    },
    errorHandler: resolver.resolve("server/error.ts"),
  },
  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        noUncheckedIndexedAccess: true,
        noImplicitAny: true,
        noImplicitThis: true,
      },
    },
  },
});
