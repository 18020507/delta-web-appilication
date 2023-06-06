<template>
  <div class="container">
    <div class="title">
      <h2>Danh sách yêu cầu từ phía xưởng</h2>
      <div class="table-function">
        <input
          type="date"
          class="request-date"
          v-model="form.request_date"
          @change="handleChange"
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
    <div class="create-request">
      <a-button type="primary" @click="openPopUp()"> Tạo yêu cầu </a-button>
    </div>

    <div class="table">
      <TableRepairShopRequestView ref="tableRef" :form="form" />
    </div>

    <a-modal
      v-model:visible="modalVisible"
      title="Tạo yêu cầu gọi xe"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
      :width="800"
    >
      <div class="modal-content">
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
          <SelectRepairPlace v-model:value="requestRepairPlace" />
        </div>
        <div class="request-item">
          <b>Ngày Hẹn:</b>
          <input type="date" v-model="requestAppointmentDate" />
        </div>
        <div class="request-item">
          <b>Mức độ ưu tiên:</b>
          <SelectRequestLevel v-model:value="requestLevel" />
        </div>
        <div class="request-item">
          <b>Chọn xe:</b>
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
        <div class="request-item">
          <b>Lái Xe:</b>
          <input v-model="requestDriver" disabled="disabled" />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Button, Modal } from "ant-design-vue";
import TableRepairShopRequestView from "./components/TableRepairShopRequestView.vue";
import SelectSearchPlate from "../components/SelectSearchPlate.vue";
import SelectSearchRepairPlace from "../components/SelectSearchRepairPlace.vue";
import SelectSearchStatus from "../components/SelectSearchStatus.vue";
import SelectRepairPlace from "../components/SelectRepairPlace.vue";
import SelectRequestLevel from "../components/SelectRequestLevel.vue";
import { getTruckManagementFromTruckId } from "@/api/truck-management/truckManagement";
import { createRequest, getLicensePlate } from "@/api/request/request";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { REQUEST_STATUS, REQUEST_TYPE } from "@/utils/const";
import { useUserStore } from "@/store/userStore";
import { useNotification } from "@kyvg/vue3-notification";

export default defineComponent({
  components: {
    TableRepairShopRequestView,
    SelectSearchPlate,
    SelectSearchRepairPlace,
    SelectSearchStatus,
    AButton: Button,
    AModal: Modal,
    SelectRepairPlace,
    Multiselect,
    SelectRequestLevel,
  },
  data() {
    return {
      form: {
        request_date: undefined,
        truck_id: undefined,
        request_place: undefined,
        request_status: undefined,
      },
      modalVisible: false,
      options: [],
      requestName: "",
      requestDescription: "",
      requestRepairPlace: {},
      requestAppointmentDate: "",
      requestLevel: {},
      requestTruck: "",
      requestTruckId: "",
      requestDriver: "",
      requestDriverId: [],
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
  },
  methods: {
    async handleChange() {
      this.$refs.tableRef?.handleFetch();
    },
    openPopUp() {
      this.modalVisible = true;
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
    async handleModalOk() {
      const notification = useNotification();
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
      const isPayloadValid = Object.values(payload).every(
        (value) => value !== undefined
      );
      if (isPayloadValid) {
        const res = await createRequest(payload);
        if (res.status == 200) {
          notification.notify({
            title: "Create Success",
            text: "Tạo yêu cầu thành công!",
            type: "success",
            duration: 3000,
          });
          this.$refs.tableRef?.handleFetch();
        }
      } else {
        notification.notify({
          title: "Invalid Payload",
          text: "Hãy điền đầy đủ các trường thông tin",
          type: "error",
          duration: 3000,
        });
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
  margin-bottom: 10px;
}

.table-function {
  display: flex;
  flex-direction: row;
  width: 50vw;
  gap: 10px;
  align-items: center;
}

.modal-content {
  height: 400px;
  overflow-y: auto;
}

.request-date {
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: gray;
  font-weight: bold;
}
.create-request {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
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
</style>
