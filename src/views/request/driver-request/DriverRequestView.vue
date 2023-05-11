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
      <TableView :tableData="listDriverRequest" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TableView from "../components/TableView.vue";
import SortDate from "./components/SortDate.vue";
import { getRequest } from "../../../api/request/request"
export default defineComponent({
  components: { TableView, SortDate },
  data() {
    return {
      listDriverRequest: [
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
  async mounted() {
    const getListDriverRequest = await getRequest({
      params: {
        request_type: "driver",
        page_size: 10,
        page: 1,
        sort_by: "id",
        order: "desc",
      },
    });
    console.log({ getListDriverRequest });
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
