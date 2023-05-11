<template>
  <div class="container">
    <div class="title">
      <h2>Danh sách yêu cầu từ phía xưởng</h2>
    </div>
    <div class="table-function">
      <div class="sort">
        <SortDate />
      </div>
    </div>
    <div class="table">
      <TableView :tableData="listShopRequest" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TableView from "../components/TableView.vue";
import SortDate from "./components/SortDate.vue";
export default defineComponent({
  components: { TableView, SortDate },
  data() {
    return {
      listShopRequest: [
        {
          createdAt: "10/2022",
          requestName: "abc",
          driverName: "abc",
          truckPlate: "abc",
          repairPlace: "abc",
          requestStatus: "pending",
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

.table-function {
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
}
</style>
