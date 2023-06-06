<!-- <template>
  <div>
    <table>
      <tr class="table-head">
        <th>
          <div class="table-title">Ngày tạo</div>
          <div class="table-filter">
            <input
              type="date"
              v-model="form.request_date"
              @change="handleChange"
              class="request-date"
            />
          </div>
        </th>
        <th>
          <div class="table-title">Tên Yêu Cầu</div>
        </th>
        <th>
          <div class="table-title">Tên Lái Xe</div>
        </th>
        <th>
          <div class="table-title">Biển Số</div>
          <div class="table-filter">
            <SelectSearchPlate
              v-model:value="this.form.truck_id"
              @update:model-value="handleChange"
            />
          </div>
        </th>
        <th>
          <div class="table-title">Nơi Sửa</div>
          <div class="table-filter">
            <SelectSearchRepairPlace
              v-model:value="form.request_place"
              @update:model-value="handleChange"
            />
          </div>
        </th>
        <th>
          <div class="table-title">Trạng Thái</div>
          <div class="table-filter">
            <SelectSearchStatus
              v-model:value="form.request_status"
              @update:model-value="handleChange"
            />
          </div>
        </th>
        <th class="minimize-column">Chi tiết</th>
      </tr>
      <tr v-for="item in tableData" :key="item.id">
        <td>{{ item.createdAt }}</td>
        <td>{{ item.requestName }}</td>
        <td>{{ item.driverName }}</td>
        <td>{{ item.truckPlate }}</td>
        <td>{{ item.repairPlace }}</td>
        <td>{{ item.requestStatus }}</td>
        <td>
          <font-awesome-icon
            icon="fa-solid fa-eye"
            @click="openPopUp(item.id)"
          />
        </td>
      </tr>
    </table>

    <div class="pagination">
      <button :disabled="page === 1" @click="changePage(page - 1)">
        Previous
      </button>
      <span>Page {{ page }} of {{ totalPages }}</span>
      <button :disabled="page === totalPages" @click="changePage(page + 1)">
        Next
      </button>
    </div>

    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <PopUpRequestRepairShopDetail
          :requestId="requestId"
          @updateRequest="handleUpdateRequest"
        />
        <button @click="showPopup = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { getRequest } from "@/api/request/request";

import SelectSearchStatus from "../../components/SelectSearchStatus.vue";
import SelectSearchRepairPlace from "../../components/SelectSearchRepairPlace.vue";
import SelectSearchPlate from "../../components/SelectSearchPlate.vue";
import PopUpRequestRepairShopDetail from "../../components/PopUpRequestRepairShopDetail.vue";
import { REQUEST_TYPE } from "@/utils/const";

export default defineComponent({
  components: {
    SelectSearchStatus,
    SelectSearchRepairPlace,
    SelectSearchPlate,
    PopUpRequestRepairShopDetail,
  },
  props: {
    sortValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showPopup: false,
      requestId: 0,
      currentPage: 1,
      tableData: [],
      form: {
        request_date: undefined,
        truck_id: undefined,
        request_place: undefined,
        request_status: undefined,
      },
      totalItems: 0,
      page: 1,
      page_size: 10,
      sort_by: "created_at",
    };
  },
  methods: {
    async handleFetch() {
      const payload = {
        request_type: REQUEST_TYPE.REPAIR_SHOP,
        page_size: this.page_size,
        page: this.page,
        sort_by: this.sort_by,
        order: this.sortValue,
        request_date: this.form.request_date
          ? this.form.request_date
          : undefined,
        truck_id: this.form.truck_id?.value ?? undefined,
        request_place: this.form.request_place?.value ?? undefined,
        request_status: this.form.request_status?.value ?? undefined,
      };

      const res = await getRequest(payload);

      this.tableData = res.data.data.items?.map((item) => ({
        id: item.id,
        createdAt: item.created_at,
        requestName: item.request_name,
        driverName: item.driver.map((driver) => driver.driver_name).join(", "),
        truckPlate: item.license_plate,
        repairPlace: item.repair_place,
        requestStatus: item.request_status,
      }));
      this.totalItems = res.data.data.total_pages.total_items;
    },
    async changePage(newPage) {
      this.page = newPage;
      await this.handleFetch();
    },
    async handleChange() {
      await this.handleFetch();
    },
    openPopUp(requestId) {
      this.requestId = requestId;
      this.showPopup = true;
    },
    async handleUpdateRequest(statusCode) {
      if (statusCode === 200) {
        this.showPopup = false;
        await this.handleFetch();
      }
    },
  },
  async mounted() {
    await this.handleFetch();
  },
  computed: {
    totalPages() {
      const totalPage = Math.ceil(this.totalItems / this.page_size);

      return totalPage;
    },
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
}

table {
  width: 100%;
  table-layout: fixed;
}

select {
  padding: 0px 30px 0px 30px;
  margin: 5px 0px 5px 0px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
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

.request-date {
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: gray;
  font-weight: bold;
}
.minimize-column {
  width: 70px;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.popup-content {
  background-color: #fff;
  padding: 20px;
}
</style> -->

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
    title="Chi tiết yêu cầu"
    @ok="handleModalOk"
    @cancel="handleModalCancel"
    :width="800"
  >
    <div class="modal-content">
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
            <img v-else src="../../../../assets/default-avatar.jpg" />
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
            <img v-else src="../../../../assets/default-avatar.jpg" />
          </div>
          <div class="truck-information">
            <div class="truck-information-item">Biển số: {{ truckPlate }}</div>
            <div class="truck-information-item">
              Kích thước: {{ truckSize }}
            </div>
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
        <a-button type="warning" @click="handleModify">Chỉnh sửa</a-button>
        <a-button type="primary" @click="handleProcess">Phê duyệt</a-button>
        <a-button type="danger" @click="handleReject">Hủy bỏ</a-button>
      </div>
      <div v-if="!showModifyForm" class="accept-form-container">
        <div class="modify-form">
          <div class="modify-form-item">
            <h4>Tên Yêu Cầu Mới</h4>
            <input v-model="newRequestName" />
          </div>
          <div class="modify-form-item">
            <h4>Mô Tả Mới</h4>
            <textarea
              cols="5"
              rows="5"
              v-model="newRequestDescription"
            ></textarea>
          </div>
          <div class="modify-form-item">
            <h4>Nơi Sửa Mới</h4>
            <SelectRepairPlace v-model="newRepairPlace" />
          </div>
          <div class="modify-form-item">
            <h4>Ngày Hẹn</h4>
            <input type="date" v-model="newRequestDate" />
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
      </div>
      <div
        v-if="
          showListButtonFunction &&
          requestStatus == REQUEST_STATUS_VN.PROCESSING
        "
        class="list-button-function"
      >
        <a-button type="primary" @click="handleFinish">Hoàn thành</a-button>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { defineComponent } from "vue";
import { Table, Pagination, Modal, Button } from "ant-design-vue";
import {
  REPAIR_PLACE,
  REPAIR_PLACE_VN,
  REQUEST_STATUS,
  REQUEST_STATUS_VN,
  REQUEST_TYPE,
} from "@/utils/const";
import {
  getLicensePlate,
  getRequest,
  getRequestDetail,
  updateRequest,
} from "@/api/request/request";
import SelectRepairPlace from "../../components/SelectRepairPlace.vue";
import SelectRequestLevel from "../../components/SelectRequestLevel.vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { useNotification } from "@kyvg/vue3-notification";
import { getTruckManagementFromTruckId } from "@/api/truck-management/truckManagement";

export default defineComponent({
  components: {
    ATable: Table,
    APagination: Pagination,
    AModal: Modal,
    AButton: Button,
    SelectRequestLevel,
    SelectRepairPlace,
    Multiselect,
  },
  props: {
    form: Object,
  },
  data() {
    return {
      data: [],
      columns: [
        {
          title: "Ngày tạo",
          width: 100,
          dataIndex: "createdAt",
          key: "name",
          fixed: "left",
        },
        {
          title: "Tên yêu cầu",
          width: 150,
          dataIndex: "requestName",
          key: "age",
        },
        {
          title: "Tên Lái Xe",
          width: 150,
          dataIndex: "driverName",
          key: "age",
          ellipsis: true,
        },
        {
          title: "Biển số",
          dataIndex: "truckPlate",
          width: 150,
        },
        {
          title: "Nơi sửa",
          dataIndex: "repairPlace",
          width: 100,
        },
        {
          title: "Trạng thái",
          align: "center",
          dataIndex: "requestStatus",
          width: 100,
        },
        {
          title: "Chi tiết",
          key: "driverRegister",
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
      requestId: null,
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
      REQUEST_STATUS_VN: REQUEST_STATUS_VN,
      newRequestName: "",
      newRequestDescription: "",
      newRepairPlace: {},
      newRequestDate: "",
      newRequestLevel: {},
      requestTruck: "",
      requestTruckId: "",
      requestDriver: "",
      requestDriverId: "",
    };
  },
  async created() {
    const res_license_plate = await getLicensePlate();
    this.options = res_license_plate.data.data?.map((item) => ({
      label: item.truck_license_plate,
      value: item.truck_id,
    }));
  },
  async mounted() {
    await this.handleFetch();
  },
  methods: {
    async handleFetch() {
      try {
        const { current, pageSize } = this.paginationConfig;
        console.log(this.form);
        const payload = {
          page_size: pageSize,
          page: current,
          sort_by: "id",
          order: "desc",
          request_type: REQUEST_TYPE.REPAIR_SHOP,
          ...(this.form && {
            request_date: this.form.request_date,
            truck_id: this.form.truck_id?.value,
            request_place: this.form.request_place?.value,
            request_status: this.form.request_status?.value,
          }),
        };
        const res = await getRequest(payload);
        this.data = res.data.data.items?.map((item) => ({
          key: item.id,
          createdAt: item.created_at,
          requestName: item.request_name,
          driverName: item.driver
            .map((driver) => driver.driver_name)
            .join(", "),
          truckPlate: item.license_plate,
          repairPlace: item.repair_place,
          requestStatus: item.request_status,
        }));

        this.paginationConfig.total = res.data.data.total_pages.total_items;
      } catch (error) {
        console.error("Failed to fetch data from API:", error);
      }
    },
    handlePaginationChange(currentPage) {
      this.paginationConfig.current = currentPage;
      this.handleFetch();
    },
    async openPopUp(requestId) {
      const res = await getRequestDetail(requestId);
      (this.requestId = requestId),
        (this.requestName = res.data.data.request_name);
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
      this.modalVisible = true;
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
        this.modalVisible = false;
        this.handleFetch();
      }
    },
    async handleReject() {
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
        this.modalVisible = false;
        this.handleFetch();
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
        this.modalVisible = false;
        this.handleFetch();
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
    async handleModalOk() {
      if (
        this.requestStatus == REQUEST_STATUS_VN.PENDING &&
        this.showListButtonFunction == false
      ) {
        const payload = {
          request_id: this.requestId,
          ...(this.newRequestName && { request_name: this.newRequestName }),
          ...(this.newRequestDescription && {
            description: this.newRequestDescription,
          }),
          ...(this.newRepairPlace && {
            repair_place: this.newRepairPlace.value,
          }),
          ...(this.newRequestLevel && {
            request_level: this.newRequestLevel.value,
          }),
          ...(this.requestDate && { appointment_date: this.requestDate }),
          ...(this.requestTruckId && { truck_id: this.requestTruckId }),
        };
        const res_update = await updateRequest(payload);
        if (res_update.status == 200) {
          this.handleFetch();
          const notification = useNotification();
          notification.notify({
            title: "Update Success",
            text: "Cập nhật yêu cầu thành công!",
            type: "success",
            duration: 3000,
          });
        }
      }
      this.modalVisible = false;
      this.showListButtonFunction = true;
      this.modalVisible = false;
    },
    handleModalCancel() {
      this.modalVisible = false;
      this.showListButtonFunction = true;
      this.showModifyForm = true;
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

.modal-content {
  height: 400px;
  overflow-y: auto;
}

.request-summary-item {
  margin-top: 10px;
  margin-bottom: 10px;
}

.request-driver {
  flex: 1;
  margin-bottom: 20px;
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

.modify-form-item {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-right: 20px;
}

.modify-form-item textarea {
  resize: none;
}
</style>
