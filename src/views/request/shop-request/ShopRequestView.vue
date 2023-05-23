<template>
  <div class="container">
    <div class="title">
      <h2>Danh sách yêu cầu từ phía xưởng</h2>
    </div>
    <div class="table-function">
      <div class="sort">
        <SortDate />
      </div>
      <div class="create-request">
        <span>Tạo yêu cầu</span>
        <button @click="openPopUp()">
          <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
        </button>
      </div>
    </div>
    <div class="table">
      <TableView :isDateAsc="isDateAsc" requestType="repair_shop" />
    </div>
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <PopupCreateRepairShopRequest @createRequest="handleCreateRequest"/>
        <button @click="showPopup = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TableView from "../components/TableView.vue";
import SortDate from "./components/SortDate.vue";
import PopupCreateRepairShopRequest from "./components/PopupCreateRepairShopRequest.vue";

export default defineComponent({
  components: { TableView, SortDate, PopupCreateRepairShopRequest },
  data() {
    return {
      showPopup: false,
      isDateAsc: true,
    };
  },
  methods: {
    openPopUp() {
      this.showPopup = true;
    },
    async handleCreateRequest(statusCode) {
      if (statusCode === 200) {
        this.showPopup = false;
      }
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

.table-function {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
}

.create-request span {
  margin-right: 20px;
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
</style>
