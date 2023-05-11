<template>
  <table>
    <tr class="table-head">
      <th>
        <div class="table-title">Ngày tạo</div>
        <div class="table-filter">
          <SelectSearchDate :requestDateArray="uniqueDates" />
        </div>
      </th>
      <th>
        <div class="table-title">Tên Yêu Cầu</div>
      </th>
      <th>
        <div class="table-title">Tên Lái Xe</div>
        <div class="table-filter">
          <SelectSearchDriver :requestDriverArray="uniqueDriverNames" />
        </div>
      </th>
      <th>
        <div class="table-title">Biển Số</div>
        <div class="table-filter">
          <SelectSearchPlate :requestPlateArray="uniquePlates" />
        </div>
      </th>
      <th>
        <div class="table-title">Nơi Sửa</div>
        <div class="table-filter">
          <SelectSearchRepairPlace :requestRepairPlaceArray="uniqueRepairPlaces" />
        </div>
      </th>
      <th>
        <div class="table-title">Trạng Thái</div>
        <div class="table-filter">
          <SelectSearchStatus :requestStatusArray="uniqueStatuses" />
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
</template>

<script>
import { defineComponent } from "vue";
import SelectSearchDate from "./SelectSearchDate.vue";
import SelectSearchDriver from "./SelectSearchDriver.vue";
import SelectSearchStatus from "./SelectSearchStatus.vue";
import SelectSearchRepairPlace from "./SelectSearchRepairPlace.vue";
import SelectSearchPlate from "./SelectSearchPlate.vue";
export default defineComponent({
  components: {
    SelectSearchDate,
    SelectSearchDriver,
    SelectSearchStatus,
    SelectSearchRepairPlace,
    SelectSearchPlate,
  },
  props: {
    tableData: Array,
  },
  data() {
    return {
      uniqueDates: [
        { label: "10-03-2023", value: "10-03-2023" },
        { label: "10-04-2023", value: "10-04-2023" },
      ],
      uniqueDriverNames: [
        { label: "Nguyen Van A", value: "Nguyen Van A" },
        { label: "Nguyen Van B", value: "Nguyen Van B" },
      ],
      uniquePlates: [
        { label: "15R-000.01", value: "15R-000.01" },
        { label: "15R-000.02", value: "15R-000.02" },
      ],
      uniqueRepairPlaces: [
        { label: "Bắc Ninh", value: "Bắc Ninh" },
        { label: "Hải Phòng", value: "Hải Phòng" },
      ],
      uniqueStatuses: [
        { label: "Đang chờ xử lý", value: "Đang chờ xử lý" },
        { label: "Hoàn thành", value: "Hoàn thành" },
      ],
    };
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
