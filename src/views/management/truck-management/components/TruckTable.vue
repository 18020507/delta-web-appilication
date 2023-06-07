<template>
  <div class="table-container">
    <a-table
      :columns="columns"
      :data-source="data"
      :scroll="{ y: 450 }"
      :pagination="false"
      @resizeColumn="handleResizeColumn"
    >
    </a-table>
    <div class="pagination-container">
      <a-pagination
        v-model="paginationConfig.current"
        :total="paginationConfig.total"
        :show-quick-jumper="paginationConfig.showQuickJumper"
        :show-size-changer="paginationConfig.showSizeChanger"
        @change="handlePaginationChange"
      />
    </div>
  </div>
  <a-modal
    v-model:visible="modalVisible"
    title="Chi tiết xe"
    @ok="handleModalOk"
    @cancel="handleModalCancel"
    :width="800"
  >
    <div class="truck-detail">
      <div class="truck-avatar">
        <img v-if="driverAvatar" :src="driverAvatar" />
        <img v-else src="../../../../assets/default-avatar.jpg" />
      </div>
      <div class="truck-information">
        <div class="truck-information-item">Kích thước: {{ truckSize }}</div>
        <div class="truck-information-item">
          Hãng xe: {{ truckManufacturer }}
        </div>
        <div class="truck-information-item">
          Ngày đăng ký: {{ truckDateRegistration }}
        </div>
        <div class="truck-information-item">Số khung: {{ frameNumber }}</div>
        <div class="truck-information-item">Số máy: {{ engineNumber }}</div>
      </div>
    </div>
    <div class="registration">
      <a-row>
        <a-col :span="8" class="registration-label">
          <b>Ngày đăng kiểm gần nhất:</b>
        </a-col>
        <a-col :span="8" class="registration-value">{{
          lastRegistration
        }}</a-col>
      </a-row>
      <a-row>
        <a-col :span="8" class="registration-label">
          <b>Hạn đăng kiểm:</b>
        </a-col>
        <a-col :span="8" class="registration-value">{{
          deadlineRegistration
        }}</a-col>
      </a-row>
      <a-row>
        <a-col :span="8" class="registration-label">
          <b>Người thực hiện đăng kiểm:</b>
        </a-col>
        <a-col :span="8" class="registration-value">{{ registrationBy }}</a-col>
      </a-row>
      <a-row>
        <a-col :span="8" class="registration-label">
          <b>Ghi chú:</b>
        </a-col>
        <a-col :span="8" class="registration-value">{{ description }}</a-col>
      </a-row>
    </div>
    <div class="button-function">
      <a-button
        type="primary"
        v-if="showButtonFunction"
        @click="handleRegistration"
        >Cập nhật đăng kiểm</a-button
      >
    </div>
    <div v-if="showRegistrationForm">
      <div class="show-registration-form-item">
        <h4>Ngày đăng kiểm</h4>
        <input v-model="newRegistration" type="date" />
      </div>
      <div class="show-registration-form-item">
        <h4>Ghi chú</h4>
        <input v-model="newDescription" />
      </div>
    </div>
  </a-modal>
</template>

<script>
import { defineComponent } from "vue";
import { Table, Pagination, Modal, Col, Row, Button } from "ant-design-vue";
import {
  getListTruck,
  getTruckDetail,
  updateTruckById,
} from "@/api/truck-management/truckManagement";
import { useUserStore } from "@/store/userStore";
import { useNotification } from "@kyvg/vue3-notification";

export default defineComponent({
  components: {
    ATable: Table,
    APagination: Pagination,
    AModal: Modal,
    ACol: Col,
    ARow: Row,
    AButton: Button,
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      data: [],
      columns: [
        {
          title: "Hãng xe",
          width: 150,
          dataIndex: "manufacturer",
          fixed: "left",
        },
        {
          title: "Biển số",
          dataIndex: "licensePlate",
          width: 100,
          ellipsis: true,
        },
        {
          title: "Ngày đăng ký",
          dataIndex: "dateRegistration",
          width: 150,
          ellipsis: true,
        },
        {
          title: "Kích thước",
          dataIndex: "size",
          width: 150,
          ellipsis: true,
        },
        {
          title: "Trạng thái",
          key: "status",
          width: 100,
        },
        {
          title: "Chi tiết",
          key: "detail",
          align: "center",
          width: 100,
          customRender: ({ record }) => {
            return !record.driverRegister ? (
              <font-awesome-icon
                icon="fa-solid fa-eye"
                onClick={() => this.openPopUp(record.key)}
                class="pointer"
              />
            ) : null;
          },
        },
      ],
      paginationConfig: {
        current: 1,
        pageSize: 10,
        total: 0,
        showQuickJumper: true,
        showSizeChanger: false,
      },
      modalVisible: false,
      showButtonFunction: true,
      showRegistrationForm: false,
      truckId: null,
      truckSize: "",
      truckManufacturer: "",
      frameNumber: "",
      engineNumber: "",
      truckDateRegistration: "",
      registrationBy: "",
      lastRegistration: "",
      deadlineRegistration: "",
      description: "",
      newRegistration: null,
      newDescription: null,
    };
  },
  async mounted() {
    await this.handleFetch();
  },
  methods: {
    async handleFetch() {
      try {
        const { current, pageSize } = this.paginationConfig;
        const payload = {
          page_size: pageSize,
          page: current,
          sort_by: "id",
          order: "desc",
        };
        const res = await getListTruck(payload);
        this.data = res.data.data.map((item) => ({
          key: item.id,
          manufacturer: item.manufacturer,
          licensePlate: item.license_plate,
          dateRegistration: item.date_registration,
          size: item.size,
          status: true,
        }));
        this.paginationConfig.total = res.data.metadata.total_items;
      } catch (error) {
        console.error("Failed to fetch data from API:", error);
      }
    },
    handleResizeColumn(width, column) {
      column.width = width;
    },
    handlePaginationChange(currentPage) {
      this.paginationConfig.current = currentPage;
      this.handleFetch();
    },
    async openPopUp(truckId) {
      const res = await getTruckDetail(truckId);
      this.truckId = truckId;
      this.truckSize = res.data.data.size;
      this.frameNumber = res.data.data.frame_number;
      this.engineNumber = res.data.data.engine_number;
      this.truckManufacturer = res.data.data.manufacturer;
      this.truckDateRegistration = res.data.data.date_registration;
      this.registrationBy = res.data.data.registration_by;
      this.lastRegistration = res.data.data.last_registration;
      this.deadlineRegistration = res.data.data.registration_deadline;
      this.description = res.data.data.description;

      this.modalVisible = true;
    },
    handleRegistration() {
      this.showButtonFunction = false;
      this.showRegistrationForm = true;
    },
    async handleModalOk() {
      const payload = {
        truck_id: this.truckId,
        description: this.newDescription,
        last_registration: this.newRegistration,
        registration_by: this.userStore.getUserInfo().id,
      };
      const response = await updateTruckById(payload);
      if (response.status == 200) {
        const notification = useNotification();
        notification.notify({
          title: "Update Success",
          text: "Cập nhật đăng kiểm!",
          type: "success",
          duration: 3000,
        });
      }
      this.showButtonFunction = true;
      this.showRegistrationForm = false;
      this.modalVisible = false;
    },
    handleModalCancel() {
      this.modalVisible = false;
      this.showButtonFunction = true;
      this.showRegistrationForm = false;
    },
  },
});
</script>

<style lang="css">
@import "~ant-design-vue/dist/antd.css";
.table-container {
  max-width: 100%;
  display: flex;
  flex-direction: column;
}

.pagination-container {
  margin-top: 16px;
  align-self: flex-end;
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

.registration {
  margin-top: 10px;
  margin-bottom: 10px;
}

.registration-label {
  text-align: right;
}

.registration-value {
  text-align: center;
}

.button-function {
  margin-top: 20px;
  flex: 1;
  display: flex;
  justify-content: space-around;
}

.show-registration-form-item {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-right: 20px;
}
</style>
