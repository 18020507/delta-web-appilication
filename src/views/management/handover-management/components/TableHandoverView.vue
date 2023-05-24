<template>
  <table>
    <tr class="table-head">
      <th>Loại xe</th>
      <th>Biển số</th>
      <th>Lái xe sở hữu</th>
      <th>Ghi Chú</th>
    </tr>
    <tr v-for="item in tableData" :key="item.id">
      <td>{{ item.truckType }}</td>
      <td>{{ item.truckPlate }}</td>
      <td>{{ item.driverOwn }}</td>
      <td>{{ item.note }}</td>
    </tr>
  </table>
  <div class="pagination">
    <button :disabled="page === 1" @click="changePage(page - 1)">
      Previous
    </button>
    <span>Page {{ page }} of {{ totalPages }}</span>
    <button :disabled="page === totalPages" @click="changePage(page + 1)">
      Next
    </button>
  </div>
</template>

<script>
import { getHandoverManagement } from "@/api/truck-management/truckManagement";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      tableData: [],
      page: 1,
      page_size: 10,
      sort_by: "created_at",
      sortValue: "desc",
      totalItems: "",
    };
  },
  methods: {
    async handleFetch() {
      const payload = {
        page_size: this.page_size,
        page: this.page,
        sort_by: this.sort_by,
        order: this.sortValue,
      };
      const res = await getHandoverManagement(payload);
      this.tableData = res.data.data.items?.map((item) => ({
        id: item.id,
        truckId: item.truck_id,
        truckType: item.truck_type,
        truckPlate: item.truck_plate,
        driverId: item.driver_id,
        driverOwn: item.driver_name,
        note: item.description,
      }));
      this.totalItems = res.data.data.total_pages.total_items;
    },
    async changePage(newPage) {
      this.page = newPage;
      await this.handleFetch();
    },
  },
  async mounted() {
    await this.handleFetch();
  },
  computed: {
    totalPages() {
      const totalPage = Math.ceil(this.totalItems / this.page_size);
      return totalPage;
    },
  },
});
</script>

<style scoped>
table,
th,
td {
  border: 2px solid #b1b1b1;
  border-collapse: collapse;
}

tr {
  height: 38px;
  text-align: center;
  font-weight: bold;
}

table {
  width: 100%;
  table-layout: fixed;
}

.table-head {
  background-color: #b1b1b1;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
