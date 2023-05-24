import { getUserDetail } from "@/api/login/login";
import { useUserStore, useUserStoreWithout } from "@/store/userStore";

const listPageNonToken = ["/login", "/register"];

export const createRouterGuard = (router) => {
  router.beforeEach(async (to, _, next) => {
    const token = localStorage.getItem("access_token");

    if (listPageNonToken.includes(to.path)) {
      if (token) {
        next("/home");
        return;
      } else {
        next();
        return;
      }
    }

    if (!token) {
      next({
        path: "/login",
        replace: true,
      });
      return;
    } else {
      const storeUser = useUserStoreWithout();
      if (storeUser.getLastUpdate === 0) {
        const userDetailResponse = await getUserDetail();
        storeUser.setUserInfo(userDetailResponse.data.data);
      }
    }

    next();
  });
};
