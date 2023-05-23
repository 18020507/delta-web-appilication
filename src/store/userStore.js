import { defineStore } from "pinia";
import { ref, unref } from "vue";

export const useUserStore = defineStore("user-store", () => {
  const userJson = localStorage.getItem("userInfo");
  const userInfo = ref(userJson ? JSON.parse(userJson) : undefined);

  const getUserInfo = () => unref(userInfo);
  const setUserInfo = (user) => {
    console.log(user)
    localStorage.setItem("userInfo", JSON.stringify(user || {}));
    Object.assign(userInfo.value, user);
  };
  return {
    getUserInfo,
    setUserInfo,
  };
});