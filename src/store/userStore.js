import { defineStore } from "pinia";
import { ref, unref, computed } from "vue";
import { store } from "@/store";

export const useUserStore = defineStore("user-store", () => {
  const userJson = localStorage.getItem("userInfo");
  const userInfo = ref(userJson ? JSON.parse(userJson) : undefined);

  const lastUpdate = ref(0);

  const getUserInfo = () => unref(userInfo);
  const setUserInfo = (user) => {
    localStorage.setItem("userInfo", JSON.stringify(user || {}));

    userInfo.value = user;
    lastUpdate.value = new Date().getTime();
  };

  const setUserAvatar = (avatar) => {
    const user = { ...unref(userInfo) };
    user.avatar = avatar;
    setUserInfo(user);
  };

  const getAvatar = computed(() =>
    userInfo.value ? userInfo.value.avatar : undefined
  );

  const getLastUpdate = computed(() => unref(lastUpdate));
  const setLastUpdate = (time) => {
    lastUpdate.value = time;
  };

  const resetState = () => {
    userInfo.value = undefined;
    localStorage.clear("userInfo");
  };
  return {
    getUserInfo,
    setUserInfo,
    resetState,
    getAvatar,
    setUserAvatar,
    getLastUpdate,
    setLastUpdate,
  };
});

export const useUserStoreWithout = () => {
  return useUserStore(store);
};
