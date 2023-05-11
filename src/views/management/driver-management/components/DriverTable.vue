<template>
    <table>
      <tr class="table-head">
        <th>Họ Và Tên</th>
        <th>Tuổi</th>
        <th>Quê Quán</th>
        <th>Căn cước công dân</th>
        <th>Trạng Thái</th>
        <th>Ghi Chú</th>
      </tr>
      <tr v-for="item in tableData" :key="item.id">
        <td>{{ item.driverName }}</td>
        <td>{{ item.driverAge }}</td>
        <td>{{ item.driverHometown }}</td>
        <td>{{ item.driverIdCitizen }}</td>
        <td>{{ item.driverStatus }}</td>
        <td>{{ item.driverNote }}</td>
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
  