<template>
  <div id="app">
    <VNavbar v-if="this.$route.fullPath != '/login' && this.$route.fullPath != '/register'" />
    <div class="main-content">
      <notifications position="top center" :pauseOnHover=true />
      <VSidebar v-if="this.$route.fullPath != '/login' && this.$route.fullPath != '/register'" />
      <router-view />
    </div>
  </div>
</template>

<script>
import VNavbar from "./components/VNavbar.vue";
import VSidebar from "./components/VSidebar.vue";
export default {
  name: "app",
  components: { VNavbar, VSidebar },
};
</script>

<style scoped>

.main-content {
  background-color: #f1f3f5;
  display: flex;
  flex-direction: row;
}

* {
  font-family: 'IBM Plex Sans', sans-serif;
}
</style>
