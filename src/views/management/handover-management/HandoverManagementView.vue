<template>
  <div class="container">
    <div class="title">
      <h2>Bàn Giao Xe - Lái Xe</h2>
      <a-button type="primary" @click="openPopUp()">
        Tạo bàn giao xe - lái xe
      </a-button>
    </div>
    <div class="table">
      <TableHandover ref="tableRef" />
    </div>
    <a-modal
      v-model:visible="modalVisible"
      title="Tạo bàn giao xe - lái xe"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
    >
      <div class="request-item" v-for="index in multiselectCount" :key="index">
        <b>Chọn Lái Xe:</b>
        <multiselect
          v-model="driverId[index]"
          :options="optionDrivers"
          :close-on-select="true"
          :clear-on-select="false"
          placeholder="Select one"
          label="label"
          track-by="label"
        >
        </multiselect>
      </div>
      <div class="request-item">
        <button @click="addMultiselect">Thêm Lái Xe</button>
      </div>
      <div class="request-item">
        <b>Chọn Xe:</b>
        <multiselect
          v-model="truckId"
          :options="optionTrucks"
          :close-on-select="true"
          :clear-on-select="false"
          placeholder="Select one"
          label="label"
          track-by="label"
        >
        </multiselect>
      </div>
      <div class="request-item">
        <b>Mô Tả:</b>
        <textarea cols="2" rows="3" v-model="description"></textarea>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Button, Modal } from "ant-design-vue";
import TableHandover from "./components/TableHandoverView.vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import {
  createTruckManagement,
  getDriverNotRegister,
  getTruckNotRegister,
} from "@/api/truck-management/truckManagement";
import { useNotification } from "@kyvg/vue3-notification";
export default defineComponent({
  components: { TableHandover, AButton: Button, AModal: Modal, Multiselect },
  data() {
    return {
      modalVisible: false,
      optionDrivers: [],
      optionTrucks: [],
      multiselectCount: 1,
      driverId: {},
      truckId: {},
      description: "",
    };
  },
  async created() {
    const res_truck = await getTruckNotRegister();
    this.optionTrucks = res_truck.data.data?.map((item) => ({
      label: item.license_plate,
      value: item.id,
    }));
    const res_driver = await getDriverNotRegister();
    this.optionDrivers = res_driver.data.data?.map((item) => ({
      label: item.full_name,
      value: item.id,
    }));
  },
  methods: {
    openPopUp() {
      this.modalVisible = true;
    },
    addMultiselect() {
      this.multiselectCount++;
    },
    async handleModalOk() {
      for (const key in this.driverId) {
        const driverId = this.driverId[key];
        const payload = {
          truck_id: this.truckId.value,
          driver_id: driverId.value,
          description: this.description,
        };
        const response = await createTruckManagement(payload);
        if (response.status == 200) {
          const notification = useNotification();
          notification.notify({
            title: "Tạo bàn giao thành công",
            text: `Đã tạo bàn giao xe thành công`,
            type: "success",
            duration: 3000,
          });
          this.$refs.tableRef?.handleFetch();
        }
      }
      this.modalVisible = false;
    },
    handleModalCancel() {
      this.modalVisible = false;
    },
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

.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.request-item {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
}

.request-item textarea {
  resize: none;
}
</style>
