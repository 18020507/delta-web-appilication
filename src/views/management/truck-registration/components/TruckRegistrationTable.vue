<template>
    <table>
      <tr class="table-head">
        <th>Loại xe</th>
        <th>Năm đăng ký</th>
        <th>Biển số</th>
        <th>Ngày đăng kiểm</th>
        <th>Ngày đăng kiểm tiếp theo</th>
        <th>Số ngày còn lại</th>
        <th>Note</th>
      </tr>
      <tr v-for="item in tableData" :key="item.id">
        <td>{{ item.truckType }}</td>
        <td>{{ item.truckLisence }}</td>
        <td>{{ item.truckPlate }}</td>
        <td>{{ item.registrationDate }}</td>
        <td>{{ item.nextRegistrationDate }}</td>
        <td>{{ item.dayLeft }}</td>
        <td>{{ item.note }}</td>
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
  