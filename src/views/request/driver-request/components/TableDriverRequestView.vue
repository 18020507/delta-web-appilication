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
          <div class="table-filter">
            <SelectSearchDriver
              v-model:value="form.driver_id"
              @update:model-value="handleChange"
            />
          </div>
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
        <PopUpRequestDetail
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

import SelectSearchDriver from "../../components/SelectSearchDriver.vue";
import SelectSearchStatus from "../../components/SelectSearchStatus.vue";
import SelectSearchRepairPlace from "../../components/SelectSearchRepairPlace.vue";
import SelectSearchPlate from "../../components/SelectSearchPlate.vue";
import PopUpRequestDetail from "../../components/PopUpRequestDetail.vue";

export default defineComponent({
  components: {
    SelectSearchDriver,
    SelectSearchStatus,
    SelectSearchRepairPlace,
    SelectSearchPlate,
    PopUpRequestDetail,
  },
  props: {
    sortValue: {
      type: String,
      required: true,
    },
    requestType: {
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
        driver_id: undefined,
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
        request_type: this.requestType,
        page_size: this.page_size,
        page: this.page,
        sort_by: this.sort_by,
        order: this.sortValue,
        request_date: this.form.request_date
          ? this.form.request_date
          : undefined,
        driver_id: this.form.driver_id?.value ?? undefined,
        truck_id: this.form.truck_id?.value ?? undefined,
        request_place: this.form.request_place?.value ?? undefined,
        request_status: this.form.request_status?.value ?? undefined,
      };

      const res = await getRequest(payload);

      this.tableData = res.data.data.items?.map((item) => ({
        id: item.id,
        createdAt: item.created_at,
        requestName: item.request_name,
        driverName: item.driver_name,
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

<!-- <template>
  <table>
    <tr class="table-head">
      <th>Họ Và Tên</th>
      <th>Mã Nhân Viên</th>
      <th>Địa chỉ</th>
      <th>Số ĐT</th>
      <th>Trạng Thái</th>
      <th>Có Tài Khoản?</th>
      <th>Tạo Tài Khoản</th>
    </tr>
    <tr v-for="item in tableData" :key="item.id">
      <td>{{ item.driverName }}</td>
      <td>{{ item.employeeCode }}</td>
      <td>{{ item.driverAddress }}</td>
      <td>{{ item.driverPhoneNumber }}</td>
      <td>{{ item.driverStatus }}</td>
      <td>{{ item.driverRegister }}</td>
      <td>
        <font-awesome-icon
          icon="fa-solid fa-plus"
          @click="openPopUp(item.driverName, item.driverPhoneNumber, item.id)"
          :class="{ disabled: item.driverRegister }"
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
      <PopUpCreateAccount
        :driverName="driverName"
        :username="username"
        :phonenumber="phoneNumber"
        :driverId="driverId"
        @registration-success="handleRegistrationSuccess"
      />
      <button @click="showPopup = false">Close</button>
    </div>
  </div>
</template>

<script>
import { getListDriver } from "@/api/driver-management/driverManagement";
import { defineComponent } from "vue";
import PopUpCreateAccount from "./PopUpCreateAccount.vue";

export default defineComponent({
  components: {
    PopUpCreateAccount,
  },
  data() {
    return {
      tableData: [],
      page: 1,
      page_size: 10,
      sort_by: "id",
      order: "desc",
      totalItems: 0,
      driverName: "",
      username: "",
      phoneNumber: "",
      driverId: 0,
      showPopup: false,
    };
  },
  methods: {
    openPopUp(driverName, driverPhoneNumber, driverId) {
      this.driverName = driverName;
      this.username = driverName;
      this.phoneNumber = driverPhoneNumber;
      this.showPopup = true;
      this.driverId = driverId;
    },
    async handleRegistrationSuccess() {
      this.showPopup = false;
      await this.handleFetch();
    },
    async handleFetch() {
      const payload = {
        page_size: this.page_size,
        page: this.page,
        sort_by: this.sort_by,
        order: this.order,
      };
      const res = await getListDriver(payload);
      this.tableData = res.data.data?.map((item) => ({
        id: item.id,
        driverName: item.full_name,
        employeeCode: item.employee_code,
        driverAddress: item.address,
        driverPhoneNumber: item.telephone,
        branchName: item.branch_name,
        driverRegister: item.is_registered,
        driverStatus: true,
      }));
      this.totalItems = res.data.metadata.total_items;
    },
    async changePage(newPage) {
      this.page = newPage;
      await this.handleFetch();
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.page_size);
    },
  },
  async mounted() {
    await this.handleFetch();
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

.table-head {
  background-color: #b1b1b1;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
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

.disabled {
  opacity: 0.5; /* Apply desired styling to blur the icon */
  pointer-events: none; /* Disable click events on the icon */
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
        <div v-if="requestStatus" class="request-summary-item">
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
            <img v-else src="../../../../assets/default-avatar.jpg" />
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
        v-if="
          showListButtonFunction && requestStatus == REQUEST_STATUS_VN.PENDING
        "
        class="list-button-function"
      >
        <a-button type="primary" @click="handleAccept">Phê duyệt</a-button>
        <a-button type="danger" @click="handleReject">Hủy</a-button>
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
            <input
              v-model="chooseAppointmentDate"
              type="date"
              class="request-date"
            />
          </div>
        </div>
        <!-- <div class="accept-form-button-container">
          <button class="accept-form-button" @click="handleAcceptRequest">
            Cập nhật yêu cầu
          </button>
        </div> -->
      </div>

      <div v-if="!showRejectForm" class="reject-form-container">
        <div class="reject-form">
          <h4>Lý Do Hủy</h4>
          <textarea v-model="rejectForm" cols="10" rows="10"></textarea>
        </div>
        <!-- <div class="accept-form-button-container">
          <button class="accept-form-button" @click="handleRejectRequest">
            Cập nhật yêu cầu
          </button>
        </div> -->
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
  REQUEST_IMAGE,
  REQUEST_STATUS,
  REQUEST_STATUS_VN,
  REQUEST_TYPE,
} from "@/utils/const";
import {
  getRequest,
  getRequestDetail,
  getSceneImage,
  updateRequest,
} from "@/api/request/request";
import SelectRepairPlace from "../../components/SelectRepairPlace.vue";
import SelectRequestLevel from "../../components/SelectRequestLevel.vue";
import { useNotification } from "@kyvg/vue3-notification";

export default defineComponent({
  components: {
    ATable: Table,
    APagination: Pagination,
    AModal: Modal,
    AButton: Button,
    SelectRepairPlace,
    SelectRequestLevel,
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
        },
        {
          title: "Biển số",
          dataIndex: "truckPlate",
          width: 150,
          ellipsis: true,
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
      driverAvatar: "",
      truckAvatar: "",
      list_scene_image: [],
      locationLatitude: "",
      locationLongitude: "",
      showListButtonFunction: true,
      showAcceptForm: true,
      showRejectForm: true,
      chooseRepairPlace: {},
      chooseRequestLevel: {},
      chooseAppointmentDate: "",
      rejectForm: "",
      REQUEST_STATUS_VN: REQUEST_STATUS_VN,
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
          request_type: REQUEST_TYPE.DRIVER,
          ...(this.form && {
            request_date: this.form.request_date,
            driver_id: this.form.driver_id?.value ?? undefined,
            truck_id: this.form.truck_id?.value ?? undefined,
            request_place: this.form.request_place?.value,
            request_status: this.form.request_status?.value,
          }),
        };
        const res = await getRequest(payload);
        this.data = res.data.data.items?.map((item) => ({
          key: item.id,
          createdAt: item.created_at,
          requestName: item.request_name,
          driverName: item.driver_name,
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
      this.requestId = requestId;
      const res = await getRequestDetail(requestId);
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
        request_id: requestId,
        image_type: REQUEST_IMAGE.SCENE_IMAGE,
      };
      const scene_image = await getSceneImage(payload);
      this.list_scene_image = scene_image.data.data;

      this.modalVisible = true;
    },
    handleAccept() {
      this.showListButtonFunction = false;
      this.showAcceptForm = false;
    },
    handleReject() {
      this.showListButtonFunction = false;
      this.showRejectForm = false;
    },
    async handleModalOk() {
      const notification = useNotification();
      if (this.showAcceptForm == false) {
        const payload = {
          request_id: this.requestId,
          appointment_date: this.chooseAppointmentDate,
          request_level: this.chooseRequestLevel?.value ?? undefined,
          repair_place: this.chooseRepairPlace?.value ?? undefined,
          status: REQUEST_STATUS.PROCESSING,
        };
        const isPayloadValid = Object.values(payload).every(
          (value) => value !== undefined
        );

        if (isPayloadValid) {
          const res_update = await updateRequest(payload);
          if (res_update.status == 200) {
            notification.notify({
              title: "Update Success",
              text: "Cập nhật yêu cầu thành công!",
              type: "success",
              duration: 3000,
            });
            this.handleFetch();
          }
        } else {
          notification.notify({
            title: "Invalid Payload",
            text: "Hãy điền đầy đủ các trường thông tin",
            type: "error",
            duration: 3000,
          });
        }
      }
      if (this.showRejectForm == false) {
        const payload = {
          request_id: this.requestId,
          reject_reason: this.rejectForm,
          status: REQUEST_STATUS.REJECT,
        };
        const isPayloadValid = Object.values(payload).every(
          (value) => value !== undefined
        );

        if (isPayloadValid) {
          const res_update = await updateRequest(payload);
          if (res_update.status == 200) {
            notification.notify({
              title: "Update Success",
              text: "Cập nhật yêu cầu thành công!",
              type: "success",
              duration: 3000,
            });
            this.handleFetch();
          }
        } else {
          notification.notify({
            title: "Invalid Payload",
            text: "Hãy điền đầy đủ các trường thông tin",
            type: "error",
            duration: 3000,
          });
        }
      }
      this.modalVisible = false;
      this.showListButtonFunction = true;
      this.showAcceptForm = true;
      this.showRejectForm = true;
    },
    handleModalCancel() {
      this.modalVisible = false;
      this.showListButtonFunction = true;
      this.showAcceptForm = true;
      this.showRejectForm = true;
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
  margin-bottom: 20px;
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
  margin-bottom: 20px;
}

.request-image {
  flex: 1;
  margin-bottom: 20px;
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

.request-date {
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: gray;
  font-weight: bold;
}

.accept-form-container {
  margin-bottom: 50px;
  margin-top: 20px;
}

.accept-form {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
</style>
