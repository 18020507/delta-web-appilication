<template>
  <div class="container">
    <h2>Tạo Yêu Cầu Gọi Xe</h2>
    <div class="request-form">
      <div class="request-item">
        <b>Tên Yêu Cầu:</b>
        <p v-show="!requestName" class="required-field">bắt buộc điền</p>
        <input v-model="requestName" />
      </div>
      <div class="request-item">
        <b>Mô Tả:</b>
        <p v-show="!requestDescription" class="required-field">bắt buộc điền</p>
        <textarea cols="30" rows="5" v-model="requestDescription"></textarea>
      </div>
      <div class="request-item">
        <b>Nơi Sửa:</b>
        <p v-show="!requestRepairPlace" class="required-field">bắt buộc điền</p>
        <SelectRepairPlace v-model:value="requestRepairPlace" />
      </div>
      <div class="request-item">
        <b>Ngày Hẹn:</b>
        <p v-show="!requestAppointmentDate" class="required-field">
          bắt buộc điền
        </p>
        <input type="date" v-model="requestAppointmentDate" />
      </div>
      <div class="request-item">
        <b>Mức độ ưu tiên:</b>
        <p v-show="!requestLevel" class="required-field">bắt buộc điền</p>
        <SelectRequestLevel v-model:value="requestLevel" />
      </div>
      <div class="driver-truck-management">
        <div class="driver-truck-management-item">
          <b>Xe:</b>
          <p v-show="!requestTruck" class="required-field">bắt buộc điền</p>
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
import SelectRepairPlace from "../../components/SelectRepairPlace.vue";
import SelectRequestLevel from "../../components/SelectRequestLevel.vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";

export default defineComponent({
  components: { Multiselect, SelectRepairPlace, SelectRequestLevel },
  data() {
    return {
      requestName: "",
      requestDescription: "",
      requestRepairPlace: {},
      requestAppointmentDate: "",
      requestLevel: {},
      requestTruck: "",
      requestTruckId: "",
      requestDriver: "",
      requestDriverId: [],
      requestReceiverId: [],
      options: [],
      newMessage: "",
      socket: null,
      clientId: null,
      recipientId: null,
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
    this.clientId = this.userStore.getUserInfo().id;
    this.connectToWebSocket();
  },
  methods: {
    connectToWebSocket() {
      this.socket = new WebSocket(`ws://localhost:8000/ws/${this.clientId}`);

      this.socket.onopen = () => {
        console.log("connected");
        this.connected = true;
      };

      this.socket.onclose = () => {
        console.log("closed");
        this.connected = false;
      };
    },
    sendMessage() {
      if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
        console.log("WebSocket connection not established");
        return;
      }

      const message = `${this.recipientId}|${this.message}`;
      this.socket.send(message);
    },
    async handleTruckChange(value) {
      const res = await getTruckManagementFromTruckId(value.value);
      const data = res.data.data;
      if (data.length > 0) {
        this.requestDriverId = data.map((item) => item.driver_id);
        this.requestReceiverId = data.map((item) => item.user_id);
        this.requestTruckId = data[0].truck_id;
        this.requestDriver = data.map((item) => item.driver_name).join(", ");
      } else {
        this.requestDriver = "";
        this.requestDriverId = [];
        this.requestTruckId = "";
      }
    },
    async handleCreateRequest() {
      const notification = useNotification();
      if (
        !this.requestName ||
        !this.requestAppointmentDate ||
        !this.requestDescription ||
        !this.requestLevel
      ) {
        notification.notify({
          title: "Hãy điền đủ thông tin",
          text: `Thông tin còn thiếu`,
          type: "warning",
          duration: 3000,
        });
        return;
      }
      if (!this.requestDriver) {
        notification.notify({
          title: "Hãy điền đủ thông tin",
          text: `Xe chưa có lái xe`,
          type: "warning",
          duration: 3000,
        });
        return;
      }
      const payload = {
        create_by: this.userStore.getUserInfo().id,
        request_type: REQUEST_TYPE.REPAIR_SHOP,
        request_name: this.requestName,
        appointment_date: this.requestAppointmentDate,
        truck_id: this.requestTruckId,
        driver_id: this.requestDriverId,
        receiver_id: this.requestReceiverId,
        description: this.requestDescription,
        request_level: this.requestLevel.value,
        status: REQUEST_STATUS.PENDING,
        repair_place: this.requestRepairPlace.value,
      };
      const res = await createRequest(payload);
      if (res.status == 200) {
        for (const driver of this.requestReceiverId) {
          this.recipientId = driver;
          this.message = "Bạn có yêu cầu mới từ xưởng";
          this.sendMessage();
        }
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

.required-field {
  font-size: 10px;
  color: red;
}
</style>
