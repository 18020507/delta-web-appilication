<template>
  <div class="container">
    <div class="title">
      <h2>Danh sách Máy Phát</h2>
    </div>
    <div class="table">
      <GeneratorTable />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import GeneratorTable from "./components/GeneratorTable.vue";
export default defineComponent({
  components: { GeneratorTable },
});
</script>

<style scoped>
.container {
  margin-left: 30px;
  margin-top: 20px;
  margin-right: 50px;
  flex: 1;
}
</style>
