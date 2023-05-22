<template>
  <select
    class="select"
    :value="value"
    @change="handleChange"
  >
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
  methods: {
    handleChange(event) {
      this.$emit('update:value', event.target.value)
      this.$emit('change', event.target.value)
    },
  },
  emits: ["update:value", "change"]
});
</script>

<style scoped>
.select {
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
