<template>
  <div class="container">
    <div class="title">
      <h2>Danh sách Xe</h2>
    </div>
    <div class="table">
      <TruckTable />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TruckTable from "./components/TruckTable.vue";
export default defineComponent({
  components: { TruckTable },

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
