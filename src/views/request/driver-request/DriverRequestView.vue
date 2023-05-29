<template>
  <div class="container">
    <div class="title">
      <h2>Danh sách yêu cầu từ phía lái xe</h2>
    </div>
    <div class="table-function">
      <div class="sort">
        <select v-model="sortValue" @change="handleSortChange">
          <option value="desc">Ngày tạo giảm dần</option>
          <option value="asc">Ngày tạo tăng dần</option>
        </select>
      </div>
    </div>
    <div class="table">
      <TableDriverRequestView ref="tableRef" :sortValue="sortValue" requestType="driver" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TableDriverRequestView from "./components/TableDriverRequestView.vue";
export default defineComponent({
  components: { TableDriverRequestView },
  data() {
    return {
      sortValue: "desc",
    };
  },
  methods: {
    handleSortChange() {
      this.$refs.tableRef?.handleFetch();
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
  margin-bottom: 30px;
}
</style>
