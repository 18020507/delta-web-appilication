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
      <TableView :isDateAsc="isDateAsc" requestType="repair_shop" />
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
      isDateAsc: true,
      listShopRequest: [],
      uniqueDates: [],
      uniqueDriverNames: [],
      uniquePlates: [],
      uniqueRepairPlaces: [],
      uniqueStatuses: [],
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
