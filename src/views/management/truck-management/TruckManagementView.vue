<template>
  <div class="container">
    <div class="title">
      <h2>Danh sách Xe</h2>
    </div>
    <div class="table">
      <TruckTable :tableData="listTruck" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TruckTable from "./components/TruckTable.vue";
export default defineComponent({
  components: { TruckTable },
  data() {
    return {
      listTruck: [
        {
          truckPlate: "15R-09613",
          truckLisence: "abc",
          truckType: "abc",
          truckStatus: "abc",
          truckNote: "abc",
        },
      ],
    };
  },
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
