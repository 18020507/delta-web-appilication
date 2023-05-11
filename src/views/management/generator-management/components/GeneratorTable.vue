<template>
    <table>
      <tr class="table-head">
        <th>Loại máy phát</th>
        <th>Năm đăng ký</th>
        <th>Trạng Thái</th>
        <th>Số km còn lại cần thay dầu</th>
        <th>Ghi Chú</th>
      </tr>
      <tr v-for="item in tableData" :key="item.id">
        <td>{{ item.generatorType }}</td>
        <td>{{ item.generatorLisence }}</td>
        <td>{{ item.generatorStatus }}</td>
        <td>{{ item.kilometerLeft }}</td>
        <td>{{ item.generatorNote }}</td>
      </tr>
    </table>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  
  export default defineComponent({
    props: {
      tableData: Array,
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
  </style>
  