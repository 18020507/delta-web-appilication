<template>
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
  font-weight: bold;
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
</style>
