<template>
  <div class="navBar">
    <div class="sideBar-head">
      <router-link to="/home" style="display: flex">
        <div>
          <img
            src="../assets/logo-delta.png"
            width="60"
            height="40"
            class="logo"
          />
        </div>

        <div class="web-title">Delta Quản Lý Xưởng</div>
      </router-link>
    </div>
    <div class="navbar-right">
      <div class="notification" ref="noti">
        <font-awesome-icon
          icon="fa-solid fa-bell"
          class="icon-noti"
          @click="toggleNoti"
        />
        <div v-show="isNotiVisible" class="noti-menu">
          <ul>
            <li>Đăng kiểm xe X sắp hết hạn</li>
            <li>Thay dầu máy phát 1</li>
            <li>Thay dầu máy phát 2</li>
            <li>Thay dầu máy phát 3</li>
            <li>Thay dầu máy phát 4</li>
          </ul>
        </div>
        <div v-if="notiCount > 0" class="noti-count">{{ notiCount }}</div>
      </div>
      <div class="user-info" ref="menu">
        <div class="icon-user-head" @click="toggleMenu">
          <img :src="avatar_path" class="user-avatar" />
          <div class="user-name">{{ username }}</div>
          <div v-show="isMenuVisible" class="user-menu">
            <ul>
              <li>
                <router-link to="/account">
                  <font-awesome-icon icon="fa-solid fa-user" />
                  Hồ sơ cá nhân
                </router-link>
              </li>
              <li>
                <router-link to="">
                  <font-awesome-icon icon="fa-solid fa-rotate" />
                  Đổi mật khẩu
                </router-link>
              </li>
              <li>
                <router-link to="/login" @click="handleLogout">
                  <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
                  Đăng xuất
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { useUserStore } from "@/store/userStore";
import { defineComponent } from "vue";

import defaultAvatar from "@/assets/default-avatar.jpg";

export default defineComponent({
  setup() {
    const userStore = useUserStore();

    return { userStore };
  },
  data() {
    return {
      isMenuVisible: false,
      isNotiVisible: false,
      notiCount: 5,
      username: "",
    };
  },
  async created() {
    // if (!this.userStore.getUserInfo()) {
    //   console.log('vao den day')
    //   this.$router.push("/login");
    //   return
    // }
    this.username = this.userStore.getUserInfo()?.user_name;
  },
  computed: {
    avatar_path: function () {
      return this.userStore.getAvatar || defaultAvatar;
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
      if (this.isNotiVisible === true) {
        this.isNotiVisible = !this.isNotiVisible;
      }
    },
    toggleNoti() {
      this.isNotiVisible = !this.isNotiVisible;
      if (this.isMenuVisible === true) {
        this.isMenuVisible = !this.isMenuVisible;
      }
    },
    closeMenuOrNoti(event) {
      const menu = this.$refs.menu;
      const noti = this.$refs.noti;

      if (event && event.target) {
        if (menu && !menu.contains(event.target)) {
          this.isMenuVisible = false;
        }
        if (noti && !noti.contains(event.target)) {
          this.isNotiVisible = false;
        }
      }
    },
    handleLogout() {
      localStorage.clear("access_token");
      router.push("/login");
    },
  },
  async mounted() {
    document.addEventListener("click", this.closeMenuOrNoti);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeMenuOrNoti);
  },
});
</script>

<style scoped>
.navBar {
  width: 100%;
  height: 65px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #ffffff;
  border: 1px solid #ececec;
  box-sizing: border-box;
}

.navbar-right {
  display: flex;
  flex-direction: row;
}

.sideBar-head {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 25vw;
}

.notification {
  margin-top: auto;
  margin-bottom: auto;
  cursor: pointer;
  position: relative;
  margin-right: 30px;
}

.icon-noti {
  width: 20px;
  height: 20px;
}

.noti-count {
  position: absolute;
  bottom: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-info {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  margin-right: 20px;
  cursor: pointer;
}

.icon-user-head {
  display: flex;
  position: relative;
}

.user-menu {
  z-index: 1000;
  position: absolute;
  top: 50px;
  right: 0;
  width: 120px;
  background-color: white;
  border: 1px solid #ececec;
  width: 150px;
}

.noti-menu {
  z-index: 1000;
  position: absolute;
  top: 46px;
  right: 0px;
  width: 120px;
  background-color: white;
  border: 1px solid #ececec;
  width: 200px;
  overflow-y: scroll;
  max-height: 120px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  padding: 8px;
}

a {
  text-decoration: none;
  color: black;
}

.logo {
  margin-right: 20px;
}

.web-title {
  margin-top: auto;
  margin-bottom: auto;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: bold;
}

.user-avatar {
  width: 30px;
  border-radius: 50%;
  margin-right: 20px;
}

.user-name {
  margin: auto;
  font-weight: bold;
}
</style>
