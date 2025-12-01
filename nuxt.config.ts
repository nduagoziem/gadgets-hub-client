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
      appURL: "https://gadgets-hub-seven.vercel.app",
      apiAuth: "https://gadgets-hub-api.freeddns.org",
      apiBase: "https://gadgets-hub-api.freeddns.org/api",
      appName: "Gadgets Hub",
      // appURL: "http://localhost:3000",
      // apiAuth: "http://localhost:8000",
      // apiBase: "http://localhost:8000/api",
      // appName: "Gadgets Hub",
    },
  },
});
