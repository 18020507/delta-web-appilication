<template>
  <section class="dropdown-wrapper">
    <div @click="isVisible = !isVisible" class="selected-item">
      <font-awesome-icon icon="fa-solid fa-filter" />
      <span>{{ name || "Chọn tìm kiếm" }}</span>
      <font-awesome-icon
        icon="fa-solid fa-chevron-up"
        :class="isVisible ? 'dropdown' : ''"
        class="drop-down-icon"
      />
    </div>
    <div v-if="isVisible" class="dropdown-popover">
      <input v-model="searchQuery" type="text" :placeholder="placeholder" />
      <div class="options">
        <ul>
          <li
            v-for="item in filteredListItems"
            @click="() => handleChange(item.value)"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    value: {
      type: String,
    },
    listItems: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
    },
  },
  data() {
    return {
      searchQuery: "",
      selectedItem: null,
      isVisible: false,
    };
  },
  methods: {
    handleChange: function (value) {
      this.$emit("change", value);
      this.$emit("update:value", value);
      this.isVisible = false;
    },
  },
  emits: ["change", "update:value"],
  computed: {
    name: function () {
      if (!this.value) return undefined;
      return (
        this.listItems.find((item) => item.value === this.value)?.label ||
        this.value
      );
    },
    filteredListItems: function () {
      const regex = new RegExp(this.searchQuery, "i");
      return this.listItems.filter((item) => regex.test(item.label));
    },
  },
});
</script>

<style scoped>
.dropdown-wrapper {
  font-weight: 100;
  position: relative;
  margin: 0 auto;
}
.selected-item {
  border: 2px solid lightgray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
}

.dropdown-popover {
  position: absolute;
  border: 2px solid lightgray;
  max-width: 100%;
  background-color: white;
}

input {
  height: 30px;
  border: 2px solid lightgray;
}

.options {
  width: 100%;
}

.drop-down-icon.dropdown {
  transform: rotate(180deg);
  transition: all 0, 5 ease;
}

ul {
  list-style: none;
  text-align: left;
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 1px solid lightgray;
  padding: 0;
}

li {
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
}
</style>
