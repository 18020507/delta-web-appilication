<template>
  <div>
    <table>
      <tr class="table-head">
        <th>
          <div class="table-title">Ngày tạo</div>
          <div class="table-filter">
            <SelectSearchDate
              :requestDateArray="filterOptions.uniqueDates"
              v-model:value="form.request_date"
              @change="handleChange"
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
              :requestDriverArray="filterOptions.uniqueDriverNames"
              v-model:value="form.driver_id"
              @change="handleChange"
            />
          </div>
        </th>
        <th>
          <div class="table-title">Biển Số</div>
          <div class="table-filter">
            <SelectSearchPlate
              :requestPlateArray="filterOptions.uniquePlates"
              v-model:value="form.truck_id"
              @change="handleChange"
            />
          </div>
        </th>
        <th>
          <div class="table-title">Nơi Sửa</div>
          <div class="table-filter">
            <SelectSearchRepairPlace
              :requestRepairPlaceArray="filterOptions.uniqueRepairPlaces"
              v-model:value="form.request_place"
              @change="handleChange"
            />
          </div>
        </th>
        <th>
          <div class="table-title">Trạng Thái</div>
          <div class="table-filter">
            <SelectSearchStatus
              :requestStatusArray="filterOptions.uniqueStatuses"
              v-model:value="form.request_status"
              @change="handleChange"
            />
          </div>
        </th>
      </tr>
      <tr v-for="item in tableData" :key="item.id">
        <td>{{ item.createdAt }}</td>
        <td>{{ item.requestName }}</td>
        <td>{{ item.driverName }}</td>
        <td>{{ item.truckPlate }}</td>
        <td>{{ item.repairPlace }}</td>
        <td>{{ item.requestStatus }}</td>
      </tr>
    </table>
    <vue-awesome-paginate
      :total-items="100"
      :items-per-page="5"
      :max-pages-shown="5"
      v-model="currentPage"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { getRequest } from "@/api/request/request";

import SelectSearchDate from "./SelectSearchDate.vue";
import SelectSearchDriver from "./SelectSearchDriver.vue";
import SelectSearchStatus from "./SelectSearchStatus.vue";
import SelectSearchRepairPlace from "./SelectSearchRepairPlace.vue";
import SelectSearchPlate from "./SelectSearchPlate.vue";
import VueAwesomePaginate from "vue-awesome-paginate";

export default defineComponent({
  components: {
    SelectSearchDate,
    SelectSearchDriver,
    SelectSearchStatus,
    SelectSearchRepairPlace,
    SelectSearchPlate,
    VueAwesomePaginate,
  },
  props: {
    isDateAsc: {
      type: Boolean,
      required: true,
    },
    requestType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      tableData: [],
      form: {
        request_date: undefined,
        driver_id: undefined,
        truck_id: undefined,
        request_place: undefined,
        request_status: undefined,
      },
      page: 1,
      page_size: 10,
      sort_by: "id",
      filterOptions: {
        uniqueDates: [],
        uniqueDriverNames: [],
        uniquePlates: [],
        uniqueRepairPlaces: [
          {
            label: "Bắc Ninh",
            value: "BN",
          },
          {
            label: "Hải Phòng",
            value: "HP",
          },
          {
            label: "Gara đối tác",
            value: "cooperate-shop",
          },
          {
            label: "Cứu hộ",
            value: "emergency",
          },
        ],
        uniqueStatuses: [
          {
            label: "Pending",
            value: "pending",
          },
          {
            label: "Finish",
            value: "finish",
          },
        ],
      },
    };
  },
  computed: {},

  methods: {
    clickCallback(pageNum) {
      console.log(pageNum);
    },
    async handleFetch() {
      const payload = {
        request_type: this.requestType,
        page_size: this.page_size,
        page: this.page,
        sort_by: this.sort_by,
        order: this.isDateAsc ? "asc" : "desc",
        request_date: this.form.request_date
          ? this.form.request_date
          : undefined,
        driver_id: this.form.driver_id ? this.form.driver_id : undefined,
        truck_id: this.form.truck_id ? this.form.truck_id : undefined,
        request_place: this.form.request_place
          ? this.form.request_place
          : undefined,
        request_status: this.form.request_status
          ? this.form.request_status
          : undefined,
      };

      const res = await getRequest(payload);

      this.tableData = res.data.data.items?.map((item) => ({
        createdAt: item.created_at,
        requestName: item.request_name,
        driverName: item.driver_name,
        truckPlate: item.license_plate,
        repairPlace: item.repair_place,
        requestStatus: item.request_status,
      }));
    },
    async handleChange() {
      await this.handleFetch();
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

.table-head {
  background-color: lightgreen;
}

.table-filter {
  margin: 5px;
}

.table-title {
  margin-top: 10px;
}
</style>
