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
import { getRequest } from "@/api/request/request";
import { defineComponent } from "vue";
import TableView from "../components/TableView.vue";
import SortDate from "./components/SortDate.vue";
export default defineComponent({
  components: { TableView, SortDate },
  data() {
    return {
      listShopRequest: [],
    };
  },
  async mounted() {
    const getListShopRequest = await getRequest({
      request_type: "repair_shop",
      page_size: 10,
      page: 1,
      sort_by: "id",
      order: "desc",
    });
    this.listShopRequest = getListShopRequest.data.data.items?.map((item) => ({
      createdAt: item.created_at,
      requestName: item.request_name,
      driverName: item.driver_name,
      truckPlate: item.truck_plate,
      repairPlace: item.repair_place,
      requestStatus: item.request_status,
    }));
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
