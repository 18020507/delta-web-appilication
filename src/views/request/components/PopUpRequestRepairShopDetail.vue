<template>
  <div class="container">
    <h2>Chi tiết Yêu cầu</h2>
    <div class="request-summary">
      <div class="request-summary-item">
        <b>Tên Yêu Cầu:</b> {{ requestName }}
      </div>
      <div class="request-summary-item">
        <b>Miêu Tả:</b> {{ requestDescription }}
      </div>
      <div class="request-summary-item">
        <b>Trạng Thái:</b> {{ requestStatus }}
      </div>
      <div v-if="requestLevel" class="request-summary-item">
        <b>Mức độ khẩn cấp:</b> {{ requestLevel }}
      </div>
      <div class="request-summary-item">
        <b>Ngày Tạo:</b> {{ requestCreatedAt }}
      </div>
      <div class="request-summary-item">
        <b>Ngày Hẹn:</b> {{ requestAppointmentDate }}
      </div>
      <div v-if="repairPlace" class="request-summary-item">
        <b>Nơi Sửa:</b> {{ repairPlace }}
      </div>
    </div>
    <div class="request-driver" v-for="driver in drivers" :key="driver.id">
      <h4>Yêu cầu đến lái xe {{ driver.driverName }}</h4>
      <div class="driver-detail">
        <div class="driver-avatar">
          <img v-if="driverAvatar" :src="driverAvatar" />
          <img v-else src="../../../assets/default-avatar.jpg" />
        </div>
        <div class="driver-information">
          <div class="driver-information-item">
            Số điện thoại: {{ driver.driverPhoneNumber }}
          </div>
          <div class="driver-information-item">
            Địa chỉ: {{ driver.driverAddress }}
          </div>
          <div class="driver-information-item">
            Ngày Sinh: {{ driver.driverDateOfBirth }}
          </div>
        </div>
      </div>
    </div>
    <div class="request-truck">
      <h4>Thông tin xe</h4>
      <div class="truck-detail">
        <div class="truck-avatar">
          <img v-if="truckAvatar" :src="truckAvatar" />
          <img v-else src="../../../assets/default-avatar.jpg" />
        </div>
        <div class="truck-information">
          <div class="truck-information-item">Biển số: {{ truckPlate }}</div>
          <div class="truck-information-item">Kích thước: {{ truckSize }}</div>
          <div class="truck-information-item">
            Hãng xe: {{ truckManufacturer }}
          </div>
          <div class="truck-information-item">
            Ngày đăng ký: {{ truckDateRegistration }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="
        showListButtonFunction && requestStatus == REQUEST_STATUS_VN.PENDING
      "
      class="list-button-function"
    >
      <button class="modify-button" @click="handleModify">Chỉnh Sửa</button>
      <button class="process-button" @click="handleProcess">Phê Duyệt</button>
      <button class="cancel-button" @click="handleCancel">Hủy Bỏ</button>
    </div>

    <div v-if="!showModifyForm" class="accept-form-container">
      <div class="modify-form">
        <div class="modify-form-item">
          <h4>Tên Yêu Cầu</h4>
          <input v-model="newRequestName" />
        </div>
        <div class="modify-form-item">
          <h4>Mô Tả</h4>
          <textarea
            cols="30"
            rows="10"
            v-model="newRequestDescription"
          ></textarea>
        </div>
        <div class="modify-form-item">
          <h4>Nơi Sửa</h4>
          <SelectRepairPlace v-model="newRepairPlace" />
        </div>
        <div class="modify-form-item">
          <h4>Ngày Hẹn</h4>
          <input type="date" v-model="requestDate" />
        </div>
        <div class="modify-form-item">
          <h4>Mức Độ Ưu Tiên</h4>
          <SelectRequestLevel v-model="newRequestLevel" />
        </div>
        <div class="modify-form-item">
          <h4>Xe</h4>
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
        <div class="modify-form-item">
          <h4>Lái Xe</h4>
          <input v-model="requestDriver" disabled="disabled" />
        </div>
      </div>
      <div class="modify-form-button-container">
        <button class="modify-form-button" @click="handleModifyRequest">
          Cập nhật yêu cầu
        </button>
      </div>
    </div>

    <div
      v-if="
        showListButtonFunction && requestStatus == REQUEST_STATUS_VN.PROCESSING
      "
      class="list-button-function"
    >
      <button class="finish-button" @click="handleFinish">Hoàn thành</button>
    </div>
  </div>
</template>

<script>
import {
  getLicensePlate,
  getRequestDetail,
  updateRequest,
} from "@/api/request/request";
import {
  REPAIR_PLACE,
  REPAIR_PLACE_VN,
  REQUEST_STATUS,
  REQUEST_STATUS_VN,
} from "@/utils/const";
import SelectRepairPlace from "./SelectRepairPlace.vue";
import SelectRequestLevel from "./SelectRequestLevel.vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { defineComponent } from "vue";
import { getTruckManagementFromTruckId } from "@/api/truck-management/truckManagement";
import { useNotification } from "@kyvg/vue3-notification";

export default defineComponent({
  components: { Multiselect, SelectRepairPlace, SelectRequestLevel },
  props: {
    requestId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      requestName: "",
      requestDescription: "",
      requestStatus: "",
      requestLevel: "",
      requestCreatedAt: "",
      requestAppointmentDate: "",
      repairPlace: "",
      drivers: [],
      truckPlate: "",
      truckSize: "",
      truckManufacturer: "",
      truckDateRegistration: "",
      truckAvatar: "",
      showListButtonFunction: true,
      showModifyForm: true,
      requestTruck: "",
      requestTruckId: "",
      requestDriver: "",
      requestDriverId: "",
      requestDate: "",
      newRequestName: "",
      newRequestDescription: "",
      newRepairPlace: {},
      newRequestLevel: {},
      options: [],
      REQUEST_STATUS_VN: REQUEST_STATUS_VN,
    };
  },
  async created() {
    const res_license_plate = await getLicensePlate();
    this.options = res_license_plate.data.data?.map((item) => ({
      label: item.truck_license_plate,
      value: item.truck_id,
    }));
  },
  methods: {
    async handleFetch() {
      const res = await getRequestDetail(this.requestId);
      this.requestName = res.data.data.request_name;
      this.requestDescription = res.data.data.description;
      if (res.data.data.status == REQUEST_STATUS.PENDING) {
        this.requestStatus = REQUEST_STATUS_VN.PENDING;
      } else if (res.data.data.status == REQUEST_STATUS.PROCESSING) {
        this.requestStatus = REQUEST_STATUS_VN.PROCESSING;
      } else if (res.data.data.status == REQUEST_STATUS.FINISH) {
        this.requestStatus = REQUEST_STATUS_VN.FINISH;
      } else if (res.data.data.status == REQUEST_STATUS.REJECT) {
        this.requestStatus = REQUEST_STATUS_VN.REJECT;
      }
      this.requestLevel = res.data.data.request_level;
      this.requestCreatedAt = res.data.data.created_at;
      this.requestAppointmentDate = res.data.data.appointment_date;
      if (res.data.data.repair_place == REPAIR_PLACE.BN) {
        this.repairPlace = REPAIR_PLACE_VN.BN;
      } else if (res.data.data.repair_place == REPAIR_PLACE.HP) {
        this.repairPlace = REPAIR_PLACE_VN.HP;
      } else if (res.data.data.repair_place == REPAIR_PLACE.COOPERATE_SHOP) {
        this.repairPlace = REPAIR_PLACE_VN.COOPERATE_SHOP;
      } else if (res.data.data.repair_place == REPAIR_PLACE.EMERGENCY) {
        this.repairPlace = REPAIR_PLACE_VN.EMERGENCY;
      }

      this.drivers = res.data.data.driver.map((driver) => ({
        id: driver.driver_id,
        driverAvatar: driver.driver_avatar,
        driverName: driver.driver_name,
        driverDateOfBirth: driver.driver_date_of_birth,
        driverHometown: driver.driver_hometown,
        driverPhoneNumber: driver.driver_phone_number,
        driverAddress: driver.driver_address,
      }));

      this.truckAvatar = res.data.data.truck_avatar;
      this.truckPlate = res.data.data.truck_plate;
      this.truckSize = res.data.data.truck_size;
      this.truckManufacturer = res.data.data.truck_manufacturer;
      this.truckDateRegistration = res.data.data.truck_date_registration;
    },
    handleModify() {
      this.showListButtonFunction = false;
      this.showModifyForm = false;
    },
    async handleProcess() {
      const payload = {
        request_id: this.requestId,
        status: REQUEST_STATUS.PROCESSING,
      };
      const res_update = await updateRequest(payload);
      if (res_update.status == 200) {
        const notification = useNotification();
        notification.notify({
          title: "Update Success",
          text: "Phê duyệt yêu cầu thành công!",
          type: "success",
          duration: 3000,
        });
        this.$emit("updateRequest", res_update.status);
      }
    },
    async handleCancel() {
      const payload = {
        request_id: this.requestId,
        status: REQUEST_STATUS.REJECT,
      };
      const res_update = await updateRequest(payload);
      if (res_update.status == 200) {
        const notification = useNotification();
        notification.notify({
          title: "Cancel Success",
          text: "Hủy yêu cầu thành công!",
          type: "success",
          duration: 3000,
        });
        this.$emit("updateRequest", res_update.status);
      }
    },

    async handleFinish() {
      const payload = {
        request_id: this.requestId,
        status: REQUEST_STATUS.FINISH,
      };
      const res_update = await updateRequest(payload);
      if (res_update.status == 200) {
        const notification = useNotification();
        notification.notify({
          title: "Update Success",
          text: "Hoàn thành yêu cầu!",
          type: "success",
          duration: 3000,
        });
        this.$emit("updateRequest", res_update.status);
      }
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
    async handleModifyRequest() {
      const payload = {
        request_id: this.requestId,
        ...(this.newRequestName && { request_name: this.newRequestName }),
        ...(this.newRequestDescription && {description: this.newRequestDescription}),
        ...(this.newRepairPlace && {repair_place: this.newRepairPlace.value}),
        ...(this.newRequestLevel && {request_level: this.newRequestLevel.value}),
        ...(this.requestDate && { appointment_date: this.requestDate }),
        ...(this.requestTruckId && { truck_id: this.requestTruckId }),
      };
      console.log(payload);
      const res_update = await updateRequest(payload);
      if (res_update.status == 200) {
        const notification = useNotification();
        notification.notify({
          title: "Update Success",
          text: "Cập nhật yêu cầu thành công!",
          type: "success",
          duration: 3000,
        });
        this.$emit("updateRequest", res_update.status);
      }
    },
  },
  async mounted() {
    await this.handleFetch();
  },
});
</script>

<style scoped>
.container {
  width: 800px;
  height: 600px;
  overflow: auto;
}

.request-summary-item {
  margin-top: 10px;
  margin-bottom: 10px;
}

.request-driver {
  flex: 1;
}

.driver-detail {
  display: flex;
  margin-left: auto;
  margin-right: auto;
}

.driver-information {
  margin-left: 150px;
  margin-top: auto;
  margin-bottom: auto;
}

.driver-avatar {
  margin-left: 50px;
}

.driver-avatar img {
  width: 136px;
  height: auto;
  border-radius: 50%;
}
.driver-information-item {
  margin-top: 10px;
  margin-bottom: 10px;
}

.request-truck {
  flex: 1;
}

.truck-detail {
  display: flex;
}

.truck-avatar {
  margin-left: 50px;
}

.truck-avatar img {
  width: 136px;
  height: auto;
  border-radius: 50%;
}
.truck-information {
  margin-left: 150px;
  margin-top: auto;
  margin-bottom: auto;
}

.truck-information-item {
  margin-top: 7px;
  margin-bottom: 7px;
}

.list-button-function {
  margin-top: 50px;
  flex: 1;
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;
}

.modify-button {
  background-color: lightgreen;
  width: 150px;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
}

.process-button {
  background-color: yellow;
  width: 150px;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
}
.cancel-button {
  background-color: lightcoral;
  width: 150px;
  padding: 10px;
  border: none;
  font-weight: bold;
  border-radius: 5px;
}

.finish-button {
  background-color: lightgreen;
  width: 150px;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
}

.modify-form-item {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-right: 20px;
}

.modify-form-item textarea {
  resize: none;
}

.modify-form-button-container {
  display: flex;
  justify-content: center;
}

.modify-form-button {
  margin-top: 50px;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
  background-color: lightgreen;
}
</style>
