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
      <div  v-if="requestStatus" class="request-summary-item">
        <b>Trạng Thái:</b> {{ requestStatus }}
      </div>
      <div v-if="requestLevel" class="request-summary-item">
        <b>Mức độ khẩn cấp:</b> {{ requestLevel }}
      </div>
      <div class="request-summary-item">
        <b>Ngày Tạo:</b> {{ requestCreatedAt }}
      </div>
      <div v-if="repairPlace" class="request-summary-item">
        <b>Nơi Sửa:</b> {{ repairPlace }}
      </div>
      <div v-if="appointmentDate" class="request-summary-item">
        <b>Ngày Hẹn:</b> {{ appointmentDate }}
      </div>
      <div v-if="feedback" class="request-summary-item">
        <b>Đánh giá từ lái xe:</b> {{ feedback }}
      </div>
      <div v-if="rejectReason" class="request-summary-item">
        <b>Lý do từ chối:</b> {{ rejectReason }}
      </div>
    </div>
    <div class="request-driver">
      <h4>Yêu cầu từ lái xe {{ driverName }}</h4>
      <div class="driver-detail">
        <div class="driver-avatar">
          <img v-if="driverAvatar" :src="driverAvatar" />
          <img v-else src="../../../assets/default-avatar.jpg" />
        </div>
        <div class="driver-information">
          <div class="driver-information-item">
            Số điện thoại: {{ driverPhoneNumber }}
          </div>
          <div class="driver-information-item">
            Địa chỉ: {{ driverAddress }}
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
    <div class="request-location">
      <h4>Địa điểm gặp sự cố</h4>
      <div class="location-map"></div>
    </div>
    <div class="request-image">
      <h4>Hình ảnh hiện trường</h4>
      <div class="image-container">
        <img
          v-for="image in list_scene_image"
          :src="image"
          class="field-image"
          :key="image"
        />
      </div>
    </div>
    <div
      v-if="showListButtonFunction && requestStatus == REQUEST_STATUS_VN.PENDING"
      class="list-button-function"
    >
      <button class="accept-button" @click="handleAccept">Phê Duyệt</button>
      <button class="reject-button" @click="handleReject">Hủy</button>
    </div>

    <div v-if="!showAcceptForm" class="accept-form-container">
      <div class="accept-form">
        <div>
          <h4>Địa điểm sửa chữa</h4>
          <SelectRepairPlace v-model:value="chooseRepairPlace" />
        </div>
        <div>
          <h4>Mức độ khẩn cấp</h4>
          <SelectRequestLevel v-model:value="chooseRequestLevel" />
        </div>
        <div>
          <h4>Ngày hẹn</h4>
          <input v-model="chooseAppointmentDate" type="date" />
        </div>
      </div>
      <div class="accept-form-button-container">
        <button class="accept-form-button" @click="handleAcceptRequest">
          Cập nhật yêu cầu
        </button>
      </div>
    </div>

    <div v-if="!showRejectForm" class="reject-form-container">
      <div class="reject-form">
        <h4>Lý Do Hủy</h4>
        <textarea v-model="rejectForm" cols="30" rows="10"></textarea>
      </div>
      <div class="accept-form-button-container">
        <button class="accept-form-button" @click="handleRejectRequest">
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
      <button class="accept-button" @click="handleFinish">Hoàn thành</button>
    </div>
  </div>
</template>

<script>
import {
  getRequestDetail,
  getSceneImage,
  updateRequest,
} from "@/api/request/request";
import SelectRequestLevel from "./SelectRequestLevel.vue";
import SelectRepairPlace from "./SelectRepairPlace.vue";
import {
  REPAIR_PLACE,
  REPAIR_PLACE_VN,
  REQUEST_IMAGE,
  REQUEST_STATUS,
  REQUEST_STATUS_VN,
  REQUEST_TYPE,
} from "@/utils/const";
import { defineComponent } from "vue";
import { useNotification } from "@kyvg/vue3-notification";

export default defineComponent({
  props: {
    requestId: {
      type: Number,
      required: true,
    },
  },
  components: {
    SelectRepairPlace,
    SelectRequestLevel,
  },
  data() {
    return {
      requestName: "",
      requestDescription: "",
      requestStatus: "",
      requestLevel: "",
      requestCreatedAt: "",
      repairPlace: "",
      appointmentDate: "",
      feedback: "",
      rejectReason: "",
      driverName: "",
      driverPhoneNumber: "",
      driverAddress: "",
      truckPlate: "",
      truckSize: "",
      truckManufacturer: "",
      truckDateRegistration: "",
      locationLatitude: "",
      locationLongitude: "",
      isDriverRequest: true,
      driverAvatar: "",
      truckAvatar: "",
      list_scene_image: [],
      showListButtonFunction: true,
      showAcceptForm: true,
      showRejectForm: true,
      chooseRepairPlace: "",
      chooseRequestLevel: "",
      chooseAppointmentDate: "",
      rejectForm: "",
      REQUEST_STATUS_VN: REQUEST_STATUS_VN,
    };
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
      if (res.data.data.repair_place == REPAIR_PLACE.BN) {
        this.repairPlace = REPAIR_PLACE_VN.BN;
      } else if (res.data.data.repair_place == REPAIR_PLACE.HP) {
        this.repairPlace = REPAIR_PLACE_VN.HP;
      } else if (res.data.data.repair_place == REPAIR_PLACE.COOPERATE_SHOP) {
        this.repairPlace = REPAIR_PLACE_VN.COOPERATE_SHOP;
      } else if (res.data.data.repair_place == REPAIR_PLACE.EMERGENCY) {
        this.repairPlace = REPAIR_PLACE_VN.EMERGENCY;
      }
      this.appointmentDate = res.data.data.appointment_date;
      this.feedback = res.data.data.feedback;
      this.rejectReason = res.data.data.reject_reason;
      if (res.data.data.type == REQUEST_TYPE.REPAIR_SHOP) {
        this.isDriverRequest = false;
        this.driverName = res.data.data.driver_name;
        this.driverPhoneNumber = res.data.data.driver_phone_number;
      } else if (res.data.data.type == REQUEST_TYPE.DRIVER) {
        this.driverName = res.data.data.created_by_name;
        this.driverPhoneNumber = res.data.data.created_by_phone_number;
      }
      this.driverAvatar = res.data.data.create_avatar;
      this.driverAddress = res.data.data.created_by_address;
      this.truckAvatar = res.data.data.truck_avatar;
      this.truckPlate = res.data.data.truck_plate;
      this.truckSize = res.data.data.truck_size;
      this.truckManufacturer = res.data.data.truck_manufacturer;
      this.truckDateRegistration = res.data.data.truck_date_registration;
      this.locationLatitude = res.data.data.location_latitude;
      this.locationLongitude = res.data.data.location_longitude;

      const payload = {
        request_id: this.requestId,
        image_type: REQUEST_IMAGE.SCENE_IMAGE,
      };
      const scene_image = await getSceneImage(payload);
      this.list_scene_image = scene_image.data.data;
    },
    handleAccept() {
      this.showListButtonFunction = false;
      this.showAcceptForm = false;
    },
    handleReject() {
      this.showListButtonFunction = false;
      this.showRejectForm = false;
    },
    async handleAcceptRequest() {
      const appointmentDateValue = this.chooseAppointmentDate;
      const repairPlaceValue = this.chooseRepairPlace;
      const requestLevelValue = this.chooseRequestLevel;
      const payload = {
        request_id: this.requestId,
        appointment_date: appointmentDateValue,
        request_level: requestLevelValue,
        repair_place: repairPlaceValue,
        status: REQUEST_STATUS.PROCESSING,
      };

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
    async handleRejectRequest() {
      const rejectReason = this.rejectForm;
      const payload = {
        request_id: this.requestId,
        reject_reason: rejectReason,
        status: REQUEST_STATUS.REJECT,
      };

      const res_update = await updateRequest(payload);
      if (res_update.status == 200) {
        console.log("success");
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
        console.log("success");
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

.request-location {
  flex: 1;
}

.request-image {
  flex: 1;
}

.image-container {
  display: flex;
  flex-direction: column;
  margin: auto;
}

.field-image {
  margin-bottom: 10px;
}

.list-button-function {
  margin-top: 20px;
  flex: 1;
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;
}

.accept-button {
  background-color: lightgreen;
  width: 150px;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
}

.reject-button {
  background-color: lightcoral;
  width: 150px;
  padding: 10px;
  border: none;
  font-weight: bold;
  border-radius: 5px;
}

.accept-form-container {
  margin-bottom: 50px;
  margin-top: 20px;
}

.reject-form-container {
  margin-bottom: 50px;
  margin-top: 20px;
}

.reject-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.reject-form textarea {
  resize: none;
  margin-right: 15px;
}

.accept-form {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.accept-form-button-container {
  display: flex;
  justify-content: center;
}

.accept-form-button {
  margin-top: 50px;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
  background-color: lightgreen;
}
</style>
