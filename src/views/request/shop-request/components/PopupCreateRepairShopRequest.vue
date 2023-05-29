<template>
  <div class="container">
    <h2>Tạo Yêu Cầu Gọi Xe</h2>
    <div class="request-form">
      <div class="request-item">
        <b>Tên Yêu Cầu:</b>
        <input v-model="requestName" />
      </div>
      <div class="request-item">
        <b>Mô Tả:</b>
        <textarea cols="30" rows="5" v-model="requestDescription"></textarea>
      </div>
      <div class="request-item">
        <b>Nơi Sửa:</b>
        <select v-model="requestRepairPlace">
          <option value="BN">Bắc Ninh</option>
          <option value="HP">Hải Phòng</option>
          <option value="COOPERATE_SHOP">Gara đối tác</option>
        </select>
      </div>
      <div class="request-item">
        <b>Ngày Hẹn:</b>
        <input type="date" v-model="requestAppointmentDate" />
      </div>
      <div class="request-item">
        <b>Mức độ ưu tiên:</b>
        <select v-model="requestLevel">
          <option value="high">Cao</option>
          <option value="low">Thấp</option>
          <option value="maintenance">Bảo dưỡng</option>
          <option value="emergency">Cứu hộ</option>
        </select>
      </div>
      <div class="driver-truck-management">
        <div class="driver-truck-management-item">
          <b>Xe:</b>
          <multiselect
            v-model="requestTruck"
            :options="options"
            :close-on-select="true"
            :clear-on-select="false"
            placeholder="Select one"
            label="label"
            track-by="label"
            @update:modelValue="handleTruckChange"
          >
          </multiselect>
        </div>
        <div class="driver-truck-management-item">
          <b>Lái Xe:</b>
          <input v-model="requestDriver" disabled="disabled" />
        </div>
      </div>
      <div class="button-submit">
        <button @click="handleCreateRequest">Tạo Yêu Cầu</button>
      </div>
    </div>
  </div>
</template>

<script>
import { createRequest } from "@/api/request/request";
import { getLicensePlate } from "@/api/request/request";
import { getTruckManagementFromTruckId } from "@/api/truck-management/truckManagement";
import { useUserStore } from "@/store/userStore";
import { REQUEST_STATUS, REQUEST_TYPE } from "@/utils/const";
import { useNotification } from "@kyvg/vue3-notification";
import { defineComponent } from "vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";

export default defineComponent({
  components: { Multiselect },
  data() {
    return {
      requestName: "",
      requestDescription: "",
      requestRepairPlace: "",
      requestAppointmentDate: "",
      requestLevel: "",
      requestTruck: "",
      requestTruckId: "",
      requestDriver: "",
      requestDriverId: "",
      options: [],
    };
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  async created() {
    const res_license_plate = await getLicensePlate();
    this.options = res_license_plate.data.data?.map((item) => ({
      label: item.truck_license_plate,
      value: item.truck_id,
    }));
  },
  methods: {
    async handleTruckChange(value) {
      const res = await getTruckManagementFromTruckId(value.value);
      const data = res.data.data;
      if (data.length > 0) {
        this.requestTruckId = data[0].truck_id;
        this.requestDriver = data[0].driver_name;
        this.requestDriverId = data[0].driver_id;
      } else {
        this.requestDriver = "";
      }
    },
    async handleCreateRequest() {
      const payload = {
        create_by: this.userStore.getUserInfo().id,
        request_type: REQUEST_TYPE.REPAIR_SHOP,
        request_name: this.requestName,
        appointment_date: this.requestAppointmentDate,
        truck_id: this.requestTruckId,
        driver_id: this.requestDriverId,
        description: this.requestDescription,
        request_level: this.requestLevel,
        status: REQUEST_STATUS.PENDING,
        repair_place: this.requestRepairPlace,
      };
      const res = await createRequest(payload);
      if (res.status == 200) {
        const notification = useNotification();
        notification.notify({
          title: "Create Success",
          text: "Tạo yêu cầu thành công!",
          type: "success",
          duration: 3000,
        });
        this.$emit("createRequest", res.status);
      }
    },
  },
});
</script>

<style scoped>
.container {
  width: 800px;
  height: 600px;
  overflow: auto;
}

.request-item {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
}

.request-item b {
  margin-bottom: 10px;
}

.request-item textarea {
  resize: none;
}

.driver-truck-management {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.driver-truck-management-item b {
  margin-right: 10px;
}

.button-submit {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.button-submit button {
  font-weight: bold;
  background-color: lightgreen;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin: auto;
}
</style>
