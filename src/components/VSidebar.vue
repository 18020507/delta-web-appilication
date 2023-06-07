<!-- <template>
  <div class="sidebar">
    <div
      v-for="(child, index) in children"
      :key="child.id"
      @click="handleClick(child, index)"
      :class="{ active: index === activeIndex }"
    >
      <div class="menu-item">
        <font-awesome-icon :icon="child.icon" class="menu-title" />
        <b>{{ child.name }}</b>
      </div>
      <div class="menu-child" v-if="child.showChildren">
        <div
          v-for="subChild in child.children"
          :key="subChild.id"
          class="sub-menu-item"
          @click="handleClick(subChild)"
        >
          <span>{{ subChild.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      children: [
        {
          id: 1,
          name: "Trang Chủ",
          icon: "fa fa-house",
          children: [],
          showChildren: false,
          route: "/home",
        },
        {
          id: 2,
          name: "Danh sách yêu cầu",
          icon: "fa fa-list",
          children: [
            { id: 4, name: "Yêu cầu lái xe", route: "/driver-request" },
            {
              id: 5,
              name: "Yêu cầu xưởng",
              route: "/repair-place-request",
            },
          ],
          showChildren: false,
        },
        {
          id: 3,
          name: "Quản lý tài sản",
          icon: "fa fa-clipboard-list",
          children: [
            {
              id: 6,
              name: "Danh sách lái xe",
              route: "/driver-management",
            },
            { id: 7, name: "Danh sách xe", route: "/truck-management" },
            {
              id: 8,
              name: "Bàn giao xe - lái xe",
              route: "/handover-management",
            },
            { id: 9, name: "Đăng kiểm", route: "/truck-registration-management" },
            { id: 10, name: "Máy phát", route: "/generator-management"}
          ],
          showChildren: false,
        },
      ],
      activeIndex: -1,
    };
  },
  methods: {
    handleClick(child, index = -1) {
      if (child.route) {
        this.$router.push(child.route);
        this.children.forEach((item) => (item.showChildren = false));
        this.activeIndex = index;
      } else if (child.children) {
        child.showChildren = !child.showChildren;
      }
    },
  },
  created() {
    this.children.forEach((child, index) => {
      if (this.$route.path.startsWith(child.route)) {
        this.activeIndex = index;
        return;
      }

      child.children.forEach((subChild) => {
        if (this.$route.path === subChild.route) {
          this.activeIndex = index;
          return;
        }
      });
    });
  },
});
</script>

<style scoped>
.sidebar {
  flex: 0 1 300px;
  background-color: #ffffff;
  border: 1px solid #ececec;
}

.menu-item {
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menu-title {
  margin-left: 10px;
  margin-right: 15px;
}

.sub-menu-item {
  height: 40px;
  display: flex;
  align-items: center;
  margin-left: 30px;
  cursor: pointer;
}

.active {
  background-color: #cfe6ff;
}
</style> -->
<template>
  <div class="sidebar">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      style="width: 256px"
      mode="inline"
      :open-keys="openKeys"
      @openChange="onOpenChange"
    >
      <a-menu-item key="1">
        <router-link to="/home">
          <b>Trang chủ</b>
        </router-link>
      </a-menu-item>
      <a-sub-menu key="sub2">
        <template #title><b>Danh sách yêu cầu</b></template>
        <a-menu-item key="5">
          <router-link to="/driver-request">Yêu cầu lái xe</router-link>
        </a-menu-item>
        <a-menu-item key="6">
          <router-link to="/repair-place-request">Yêu cầu xưởng</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <template #title><b>Quản lý tài sản</b></template>
        <a-menu-item key="9">
          <router-link to="/driver-management">Danh sách lái xe</router-link>
        </a-menu-item>
        <a-menu-item key="10">
          <router-link to="/truck-management">Danh sách xe</router-link>
        </a-menu-item>
        <a-menu-item key="11">
          <router-link to="/handover-management">
            Bàn giao xe - lái xe
          </router-link>
        </a-menu-item>
        <a-menu-item key="12">
          <router-link to="/generator-management">Máy phát</router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import { Menu, SubMenu, MenuItem } from "ant-design-vue";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    AMenu: Menu,
    ASubMenu: SubMenu,
    AMenuItem: MenuItem,
  },
  setup() {
    const state = reactive({
      rootSubmenuKeys: ["sub2", "sub4"],
      openKeys: [],
      selectedKeys: [],
    });

    const mailOutlinedIcon = MailOutlined;
    const appstoreOutlinedIcon = AppstoreOutlined;
    const settingOutlinedIcon = SettingOutlined;

    const onOpenChange = (openKeys) => {
      const latestOpenKey = openKeys.find(
        (key) => state.openKeys.indexOf(key) === -1
      );
      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };

    return {
      ...toRefs(state),
      mailOutlinedIcon,
      appstoreOutlinedIcon,
      settingOutlinedIcon,
      onOpenChange,
    };
  },
});
</script>

<style lang="css">
.sidebar {
  background-color: #ffffff;
}
@import "~ant-design-vue/dist/antd.css";
</style>
