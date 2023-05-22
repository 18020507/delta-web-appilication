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
      <div v-if="repairPlace" class="request-summary-item">
        <b>Nơi Sửa:</b> {{ repairPlace }}
      </div>
    </div>
    <div class="request-driver">
      <h4>Yêu cầu đến lái xe {{ driverName }}</h4>
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
  </div>
</template>

<script>
import { getRequestDetail } from "@/api/request/request";
import {
  REPAIR_PLACE,
  REPAIR_PLACE_VN,
  REQUEST_STATUS,
  REQUEST_STATUS_VN,
  REQUEST_TYPE,
} from "@/utils/const";
import { defineComponent } from "vue";

export default defineComponent({
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
      repairPlace: "",
      driverName: "",
      driverPhoneNumber: "",
      driverAddress: "",
      truckPlate: "",
      truckSize: "",
      truckManufacturer: "",
      truckDateRegistration: "",
      isDriverRequest: true,
      driverAvatar: "",
      truckAvatar: "",
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
</style>
