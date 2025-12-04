import { abortNavigation, defineNuxtRouteMiddleware } from "nuxt/app";
import { useAuthStore } from "../stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated } = useAuthStore();
  if (import.meta.server) return;
  if (isAuthenticated.customer == null) {
    return abortNavigation(), (to.path = "/login");
  }
  return;
});
