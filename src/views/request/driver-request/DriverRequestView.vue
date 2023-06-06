<template>
  <div class="container">
    <div class="title">
      <h2>Danh sách yêu cầu từ phía lái xe</h2>
      <div class="table-function">
        <input
          type="date"
          class="request-date"
          v-model="form.request_date"
          @change="handleChange"
        />
        <SelectSearchDriver
          v-model:value="form.driver_id"
          @update:model-value="handleChange"
        />
        <SelectSearchPlate
          v-model:value="form.truck_id"
          @update:model-value="handleChange"
        />
        <SelectSearchRepairPlace
          v-model:value="form.request_place"
          @update:model-value="handleChange"
        />
        <SelectSearchStatus
          v-model:value="form.request_status"
          @update:model-value="handleChange"
        />
      </div>
    </div>

    <div class="table">
      <TableDriverRequestView ref="tableRef" :form="form" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import SelectSearchDriver from "../components/SelectSearchDriver.vue";
import TableDriverRequestView from "./components/TableDriverRequestView.vue";
import SelectSearchPlate from "../components/SelectSearchPlate.vue";
import SelectSearchRepairPlace from "../components/SelectSearchRepairPlace.vue";
import SelectSearchStatus from "../components/SelectSearchStatus.vue";
export default defineComponent({
  components: {
    TableDriverRequestView,
    SelectSearchDriver,
    SelectSearchPlate,
    SelectSearchRepairPlace,
    SelectSearchStatus,
  },
  data() {
    return {
      form: {
        request_date: undefined,
        driver_id: undefined,
        truck_id: undefined,
        request_place: undefined,
        request_status: undefined,
      },
    };
  },
  methods: {
    async handleChange() {
      console.log(this.form)
      this.$refs.tableRef?.handleFetch();
    },
  },
});
</script>

<style lang="css" scoped>
@import "~ant-design-vue/dist/antd.css";
.container {
  margin-left: 30px;
  margin-top: 20px;
  margin-right: 50px;
  flex: 1;
}

.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
}

.table-function {
  display: flex;
  flex-direction: row;
  width: 50vw;
  gap: 10px;
  align-items: center;
}

.request-date {
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: gray;
  font-weight: bold;
}
</style>
