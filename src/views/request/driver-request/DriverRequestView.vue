<template>
  <div class="container">
    <div class="title">
      <h2>Danh sách yêu cầu từ phía lái xe</h2>
    </div>
    <div class="table-function">
      <div class="sort">
        <SortDate />
      </div>
    </div>
    <div class="table">
      <TableView
        :tableData="listDriverRequest"
        :uniqueDates="uniqueDates"
        :uniqueDriverNames="uniqueDriverNames"
        :uniquePlates="uniquePlates"
        :uniqueRepairPlaces="uniqueRepairPlaces"
        :uniqueStatuses="uniqueStatuses"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TableView from "../components/TableView.vue";
import SortDate from "./components/SortDate.vue";
import { getRequest } from "../../../api/request/request";
export default defineComponent({
  components: { TableView, SortDate },
  data() {
    return {
      listDriverRequest: [],
      uniqueDates: [],
      uniqueDriverNames: [],
      uniquePlates: [],
      uniqueRepairPlaces: [],
      uniqueStatuses: [],
    };
  },
  async mounted() {
    const getListDriverRequest = await getRequest({
      request_type: "driver",
      page_size: 10,
      page: 1,
      sort_by: "id",
      order: "desc",
    });
    this.listDriverRequest = getListDriverRequest.data.data.items?.map(
      (item) => ({
        createdAt: item.created_at,
        requestName: item.request_name,
        driverName: item.driver_name,
        truckPlate: item.truck_plate,
        repairPlace: item.repair_place,
        requestStatus: item.request_status,
      })
    );

    this.uniqueDates = [
      ...new Set(this.listDriverRequest.map((item) => item.createdAt)),
    ].map((date) => ({ label: date, value: date }));
    this.uniqueDriverNames = [
      ...new Set(this.listDriverRequest.map((item) => item.driverName)),
    ].map((driverName) => ({ label: driverName, value: driverName }));
    this.uniquePlates = [
      ...new Set(this.listDriverRequest.map((item) => item.truckPlate)),
    ].map((plate) => ({ label: plate, value: plate }));
    this.uniqueRepairPlaces = [
      ...new Set(this.listDriverRequest.map((item) => item.repairPlace)),
    ].map((place) => ({ label: place, value: place }));
    this.uniqueStatuses = [
      ...new Set(this.listDriverRequest.map((item) => item.requestStatus)),
    ].map((status) => ({ label: status, value: status }));

    console.log(this.uniqueDates);
    console.log(this.listDriverRequest);
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
