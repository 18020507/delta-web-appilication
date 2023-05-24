import { useUserStore } from "@/store/userStore";

export const createStateGuard = (router) => {
  router.afterEach(async (to) => {
    if (to.path === "/login") {
      const userStore = useUserStore();
      userStore.resetState()
    }
  });
};
