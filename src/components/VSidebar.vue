<template>
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
  width: 300px;
  height: 100vh;
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
</style>
