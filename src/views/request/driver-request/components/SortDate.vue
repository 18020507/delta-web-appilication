<template>
  <select :value="value" @change="handleChange">
    <option v-for="item in options" :key="item.value" :value="item.value">
      {{ item.label }}
    </option>
  </select>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  data() {
    return {
      options: [
        { label: "Ngày tạo giảm dần", value: "desc" },
        { label: "Ngày tạo tăng dần", value: "asc" },
      ],
    };
  },
  props: {
    value: {
      type: String,
    },
  },
  methods: {
    handleChange(value) {
      this.$emit("update:value", value);
      this.$emit("change", value);
    },
  },
  emits: ["update:value", "change"],
});
</script>

<style scoped>
select {
  text-align: center;
  font-weight: bold;
  padding: 0px 25px;
}

option {
  background-color: white;
  color: black;
  text-align: center;
  font-weight: bold;
}
</style>
