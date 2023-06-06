<!-- <template>
  <table>
    <tr class="table-head">
      <th>Loại xe</th>
      <th>Biển số</th>
      <th>Lái xe sở hữu</th>
      <th>Ghi Chú</th>
      <th class="minimize-column">Chi Tiết</th>
    </tr>
    <tr v-for="item in tableData" :key="item.id">
      <td>{{ item.truckType }}</td>
      <td>{{ item.truckPlate }}</td>
      <td>{{ item.driver }}</td>
      <td>{{ item.note }}</td>
      <td><font-awesome-icon icon="fa-solid fa-eye"></font-awesome-icon></td>
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
        driver_id: item.driver.map((driver) => driver.driver_id),
        driver: item.driver.map((driver) => driver.driver_name).join(", "),
        note: item.description,
      }));
      console.log(this.tableData);
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

.minimize-column {
  width: 70px;
}
</style> -->

<template>
  <div class="table-container">
    <a-table
      :columns="columns"
      :data-source="data"
      :scroll="{ y: 450 }"
      :pagination="false"
      @resizeColumn="handleResizeColumn"
    >
    </a-table>
    <div class="pagination-container">
      <a-pagination
        v-model="paginationConfig.current"
        :total="paginationConfig.total"
        :show-quick-jumper="paginationConfig.showQuickJumper"
        :show-size-changer="paginationConfig.showSizeChanger"
        @change="handlePaginationChange"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Table, Pagination } from "ant-design-vue";
import { getHandoverManagement } from "@/api/truck-management/truckManagement";

export default defineComponent({
  components: {
    ATable: Table,
    APagination: Pagination,
  },
  data() {
    return {
      data: [],
      columns: [
        {
          title: "Loại xe",
          width: 150,
          dataIndex: "truckType",
          fixed: "left",
        },
        {
          title: "Biển số",
          width: 100,
          dataIndex: "truckPlate",
        },
        {
          title: "Lái xe bàn giao",
          dataIndex: "driver",
          width: 150,
          ellipsis: true,
        },
        {
          title: "Ghi chú",
          dataIndex: "note",
          width: 150,
        },
        {
          title: "Hành động",
          align: "center",
          width: 100,
        },
      ],
      paginationConfig: {
        current: 1,
        pageSize: 10,
        total: 0,
        showQuickJumper: true,
        showSizeChanger: false,
      },
    };
  },
  async mounted() {
    await this.handleFetch();
  },
  methods: {
    async handleFetch() {
      try {
        const { current, pageSize } = this.paginationConfig;
        const payload = {
          page_size: pageSize,
          page: current,
          sort_by: "id",
          order: "desc",
        };
        const res = await getHandoverManagement(payload);
        this.data = res.data.data.items.map((item, index) => ({
          key: index,
          truckId: item.truck_id,
          truckType: item.truck_type,
          truckPlate: item.truck_plate,
          driver_id: item.driver.map((driver) => driver.driver_id),
          driver: item.driver.map((driver) => driver.driver_name).join(", "),
          note: item.description,
        }));
        this.paginationConfig.total = res.data.data.total_pages.total_items;
      } catch (error) {
        console.error("Failed to fetch data from API:", error);
      }
    },
    handleResizeColumn(width, column) {
      column.width = width;
    },
    handlePaginationChange(currentPage) {
      this.paginationConfig.current = currentPage;
      this.handleFetch();
    },
  },
});
</script>

<style lang="css">
@import "~ant-design-vue/dist/antd.css";
.table-container {
  max-width: 100%;
  display: flex;
  flex-direction: column;
}

.pagination-container {
  margin-top: 16px;
  align-self: flex-end;
}
</style>
