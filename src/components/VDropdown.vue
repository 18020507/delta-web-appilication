<template>
  <select class="select" @change="handleChange">
    <option v-for="item in options" :key="item.value" :value="item.value">
      {{ item.label }}
    </option>
  </select>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
    },
  },
});
</script>

<style scoped>
.select {
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  border-radius: 5px;
  padding: 10px 25px;
  background-color: #d9d9d9;
}

option {
  background-color: white;
  color: black;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
 
}
</style>
