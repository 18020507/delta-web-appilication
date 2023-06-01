<template>
  <div>
    <table>
      <tr class="table-head">
        <th>
          <div class="table-title">Ngày tạo</div>
          <div class="table-filter">
            <input
              type="date"
              v-model="form.request_date"
              @change="handleChange"
              class="request-date"
            />
          </div>
        </th>
        <th>
          <div class="table-title">Tên Yêu Cầu</div>
        </th>
        <th>
          <div class="table-title">Tên Lái Xe</div>
          <div class="table-filter">
            <SelectSearchDriver
              v-model:value="form.driver_id"
              @update:model-value="handleChange"
            />
          </div>
        </th>
        <th>
          <div class="table-title">Biển Số</div>
          <div class="table-filter">
            <SelectSearchPlate
              v-model:value="this.form.truck_id"
              @update:model-value="handleChange"
            />
          </div>
        </th>
        <th>
          <div class="table-title">Nơi Sửa</div>
          <div class="table-filter">
            <SelectSearchRepairPlace
              v-model:value="form.request_place"
              @update:model-value="handleChange"
            />
          </div>
        </th>
        <th>
          <div class="table-title">Trạng Thái</div>
          <div class="table-filter">
            <SelectSearchStatus
              v-model:value="form.request_status"
              @update:model-value="handleChange"
            />
          </div>
        </th>
        <th class="minimize-column">Chi tiết</th>
      </tr>
      <tr v-for="item in tableData" :key="item.id">
        <td>{{ item.createdAt }}</td>
        <td>{{ item.requestName }}</td>
        <td>{{ item.driverName }}</td>
        <td>{{ item.truckPlate }}</td>
        <td>{{ item.repairPlace }}</td>
        <td>{{ item.requestStatus }}</td>
        <td>
          <font-awesome-icon
            icon="fa-solid fa-eye"
            @click="openPopUp(item.id)"
          />
        </td>
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

    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <PopUpRequestDetail
          :requestId="requestId"
          @updateRequest="handleUpdateRequest"
        />
        <button @click="showPopup = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { getRequest } from "@/api/request/request";

import SelectSearchDriver from "../../components/SelectSearchDriver.vue";
import SelectSearchStatus from "../../components/SelectSearchStatus.vue";
import SelectSearchRepairPlace from "../../components/SelectSearchRepairPlace.vue";
import SelectSearchPlate from "../../components/SelectSearchPlate.vue";
import PopUpRequestDetail from "../../components/PopUpRequestDetail.vue";

export default defineComponent({
  components: {
    SelectSearchDriver,
    SelectSearchStatus,
    SelectSearchRepairPlace,
    SelectSearchPlate,
    PopUpRequestDetail,
  },
  props: {
    sortValue: {
      type: String,
      required: true,
    },
    requestType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showPopup: false,
      requestId: 0,
      currentPage: 1,
      tableData: [],
      form: {
        request_date: undefined,
        driver_id: undefined,
        truck_id: undefined,
        request_place: undefined,
        request_status: undefined,
      },
      totalItems: 0,
      page: 1,
      page_size: 10,
      sort_by: "created_at",
    };
  },
  methods: {
    async handleFetch() {
      const payload = {
        request_type: this.requestType,
        page_size: this.page_size,
        page: this.page,
        sort_by: this.sort_by,
        order: this.sortValue,
        request_date: this.form.request_date
          ? this.form.request_date
          : undefined,
        driver_id: this.form.driver_id?.value ?? undefined,
        truck_id: this.form.truck_id?.value ?? undefined,
        request_place: this.form.request_place?.value ?? undefined,
        request_status: this.form.request_status?.value ?? undefined,
      };

      const res = await getRequest(payload);

      this.tableData = res.data.data.items?.map((item) => ({
        id: item.id,
        createdAt: item.created_at,
        requestName: item.request_name,
        driverName: item.driver_name,
        truckPlate: item.license_plate,
        repairPlace: item.repair_place,
        requestStatus: item.request_status,
      }));
      this.totalItems = res.data.data.total_pages.total_items;
    },
    async changePage(newPage) {
      this.page = newPage;
      await this.handleFetch();
    },
    async handleChange() {
      await this.handleFetch();
    },
    openPopUp(requestId) {
      this.requestId = requestId;
      this.showPopup = true;
    },
    async handleUpdateRequest(statusCode) {
      if (statusCode === 200) {
        this.showPopup = false;
        await this.handleFetch();
      }
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

select {
  padding: 0px 30px 0px 30px;
  margin: 5px 0px 5px 0px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.table-head {
  background-color: lightgreen;
}

.table-filter {
  margin: 5px;
}

.table-title {
  margin-top: 10px;
}

.request-date {
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: gray;
  font-weight: bold;
}
.minimize-column {
  width: 70px;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.popup-content {
  background-color: #fff;
  padding: 20px;
}
</style>
