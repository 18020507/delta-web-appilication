<!-- <template>
  <table>
    <tr class="table-head">
      <th>Hãng xe</th>
      <th>Số Máy</th>
      <th>Số Khung</th>
      <th>Biển Số</th>
      <th>Ngày Đăng Ký</th>
      <th>Kích thước</th>
      <th>Trạng Thái</th>
    </tr>
    <tr v-for="item in tableData" :key="item.id">
      <td>{{ item.manufacturer }}</td>
      <td class="nowrap">{{ item.engineNumber }}</td>
      <td class="nowrap">{{ item.frameNumber }}</td>
      <td>{{ item.licensePlate }}</td>
      <td>{{ item.dateRegistration }}</td>
      <td>{{ item.size }}</td>
      <td>{{ item.status }}</td>
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
import { getListTruck } from "@/api/truck-management/truckManagement";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      tableData: [],
      page: 1,
      page_size: 10,
      sort_by: "id",
      order: "desc",
      totalItems: 0,
    };
  },
  methods: {
    async handleFetch() {
      const payload = {
        page_size: this.page_size,
        page: this.page,
        sort_by: this.sort_by,
        order: this.order,
      };
      const res = await getListTruck(payload);
      this.tableData = res.data.data?.map((item) => ({
        manufacturer: item.manufacturer,
        engineNumber: item.engine_number,
        licensePlate: item.license_plate,
        frameNumber: item.frame_number,
        dateRegistration: item.date_registration,
        size: item.size,
        status: true,
      }));
      this.totalItems = res.data.metadata.total_items;
    },
    async changePage(newPage) {
      this.page = newPage;
      await this.handleFetch();
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.page_size);
    },
  },
  async mounted() {
    await this.handleFetch();
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

.nowrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
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
import { getListTruck } from "@/api/truck-management/truckManagement";

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
          title: "Hãng xe",
          width: 100,
          dataIndex: "manufacturer",
          fixed: "left",
        },
        {
          title: "Số máy",
          width: 150,
          dataIndex: "engineNumber",
          ellipsis: true,
        },
        {
          title: "Số khung",
          dataIndex: "frameNumber",
          width: 150,
          ellipsis: true,
        },
        {
          title: "Biển số",
          dataIndex: "licensePlate",
          width: 100,
          ellipsis: true,
        },
        {
          title: "Ngày đăng ký",
          dataIndex: "dateRegistration",
          width: 150,
          ellipsis: true,
        },
        {
          title: "Kích thước",
          dataIndex: "size",
          width: 150,
          ellipsis: true,
        },
        {
          title: "Trạng thái",
          key: "status",
          fixed: "right",
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
        const res = await getListTruck(payload);
        this.data = res.data.data.map((item, index) => ({
          key: index,
          manufacturer: item.manufacturer,
          engineNumber: item.engine_number,
          frameNumber: item.frame_number,
          licensePlate: item.license_plate,
          dateRegistration: item.date_registration,
          size: item.size,
          status: true,
        }));
        this.paginationConfig.total = res.data.metadata.total_items;
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
