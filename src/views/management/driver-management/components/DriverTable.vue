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
    :title="'Tạo tài khoản mới cho lái xe ' + driverName"
    @ok="handleModalOk"
    @cancel="handleModalCancel"
  >
    <div class="guide">
      <span><b>Chú ý: quy tắc đặt tên</b></span>
      <span>Tên lái xe (viết liền không dấu) - Năm sinh</span>
      <span>Ví dụ: NguyenVanHien96</span>
    </div>
    <a-form class="driver-register-form">
      <a-row>
        <a-col :span="8" class="field-label">Tên đăng nhập:</a-col>
        <a-col :span="16">
          <a-form-item>
            <a-input v-model:value="localUsername" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8" class="field-label">Số điện thoại:</a-col>
        <a-col :span="16">
          <a-form-item>
            <a-input v-model:value="localPhonenumber" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8" class="field-label">Mật khẩu:</a-col>
        <a-col :span="16">
          <a-form-item>
            <a-input-password v-model:value="localPassword" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { defineComponent } from "vue";
import {
  Table,
  Pagination,
  Modal,
  Form,
  Input,
  InputPassword,
  Row,
  Col,
} from "ant-design-vue";
import {
  createDriverAccount,
  getListDriver,
} from "@/api/driver-management/driverManagement";
import { useNotification } from "@kyvg/vue3-notification";

export default defineComponent({
  components: {
    ATable: Table,
    APagination: Pagination,
    AModal: Modal,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AInputPassword: InputPassword,
    ARow: Row,
    ACol: Col,
  },
  data() {
    return {
      data: [],
      columns: [
        {
          title: "Họ và tên",
          width: 150,
          dataIndex: "driverName",
          key: "name",
          fixed: "left",
        },
        {
          title: "Mã nhân viên",
          width: 100,
          dataIndex: "employeeCode",
          key: "age",
        },
        {
          title: "Địa chỉ",
          dataIndex: "driverAddress",
          width: 150,
          ellipsis: true,
        },
        {
          title: "Số ĐT",
          dataIndex: "driverPhoneNumber",
          width: 150,
        },
        {
          title: "Trạng thái",
          align: "center",
          dataIndex: "driverStatus",
          width: 100,
        },
        {
          title: "Hành động",
          key: "driverRegister",
          align: "center",
          width: 100,
          customRender: ({ record }) => {
            return !record.driverRegister ? (
              <font-awesome-icon
                icon="fa-solid fa-plus"
                onClick={() =>
                  this.openPopUp(
                    record.driverName,
                    record.driverPhoneNumber,
                    record.key
                  )
                }
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
      form: null,
      localId: 0,
      driverName: "",
      localUsername: "",
      localPhonenumber: "",
      localPassword: "",
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
        const res = await getListDriver(payload);
        this.data = res.data.data.map((item, index) => ({
          key: index,
          driverName: item.full_name,
          employeeCode: item.employee_code,
          driverAddress: item.address,
          driverPhoneNumber: item.telephone,
          branchName: item.branch_name,
          driverRegister: item.is_registered,
          driverStatus: "true",
        }));
        this.paginationConfig.total = res.data.metadata.total_items;
      } catch (error) {
        console.error("Failed to fetch data from API:", error);
      }
    },
    handlePaginationChange(currentPage) {
      this.paginationConfig.current = currentPage;
      this.handleFetch();
    },
    openPopUp(driverName, phoneNumber, driverId) {
      this.driverName = driverName;
      this.localUsername = driverName;
      this.localPhonenumber = phoneNumber;
      this.localId = driverId;
      this.modalVisible = true;
    },
    async handleModalOk() {
      const payload = {
        role_id: 3,
        full_name: this.driverName,
        user_name: this.localUsername,
        password: this.localPassword,
        driver_id: this.localId,
        phone_number: this.localPhonenumber,
      };
      const response = await createDriverAccount(payload);
      if (response.success) {
        const notification = useNotification();
        notification.notify({
          title: "Tạo tài khoản thành công",
          text: `Đã tạo tài khoản thành công cho lái xe ${this.driverName}, mật khẩu ${this.localPassword}`,
          type: "success",
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

.guide {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
</style>
