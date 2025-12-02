// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css", "~/assets/css/input.css"],
  modules: ["@pinia/nuxt"],
  // plugins: ["pinia-plugin-persistedstate"],

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag == "UserLayout",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      appURL: process.env.NUXT_APP_URL,
      apiAuth: process.env.NUXT_API_AUTH,
      apiBase: process.env.NUXT_API_BASE,
      appName: process.env.NUXT_APP_NAME,
    },
  },
});
