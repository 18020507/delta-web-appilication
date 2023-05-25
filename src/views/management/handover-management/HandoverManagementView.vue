<template>
  <div class="container">
    <div class="title">
      <h2>Bàn Giao Xe - Lái Xe</h2>
    </div>
    <div class="button-function">
      <span>Tạo Bàn Giao Xe - Lái Xe</span>
      <button @click="openPopUp()">
        <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
      </button>
    </div>
    <div class="table">
      <TableHandover ref="tableRef" />
    </div>
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <PopupCreateHandoverVue @createTruckManagement="handleCreateTruckManagement" />
        <button @click="showPopup = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import PopupCreateHandoverVue from "./components/PopupCreateHandover.vue";
import TableHandover from "./components/TableHandoverView.vue";
export default defineComponent({
  components: { TableHandover, PopupCreateHandoverVue },
  data() {
    return {
      showPopup: false,
    };
  },
  methods: {
    openPopUp() {
      this.showPopup = true;
    },
    async handleCreateTruckManagement(statusCode) {
      if (statusCode === 200) {
        this.showPopup = false;
        this.$refs.tableRef?.handleFetch();
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

.button-function {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
}

.button-function span {
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
