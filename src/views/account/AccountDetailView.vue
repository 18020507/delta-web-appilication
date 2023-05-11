<template>
  <div class="container">
    <div class="avatar">
      <div class="avatar-img">
        <img v-if="!newAvatarImage" src="@/assets/user.png" />
        <img v-else :src="newAvatarImage" />
        <div class="change-avatar-icon" @click="changeAvatarImage">
          <font-awesome-icon icon="fa fa-pencil" class="icon-change-avatar" />
        </div>
      </div>
      <div class="avatar-name">Roland</div>
    </div>
    <div class="account-information">
      <div class="column">
        <div class="columnContent">
          <h3>Năm sinh</h3>
          <input type="text" />
        </div>
        <div class="columnContent">
          <h3>Địa chỉ</h3>
          <input type="text" />
        </div>
        <div class="columnContent">
          <h3>Quê quán</h3>
          <input type="text" />
        </div>
      </div>
      <div class="column">
        <div class="columnContent">
          <h3>Chức vụ</h3>
          <input type="text" />
        </div>
        <div class="columnContent">
          <h3>Chi nhánh</h3>
          <input type="text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      newAvatarImage: null,
    };
  },
  methods: {
    changeAvatarImage() {},
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.avatar {
  width: 100%;
  height: 250px;
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.avatar-img {
  position: relative;
}

.avatar-name {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
}

.account-information {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

input {
  width: 337px;
  border-radius: 5px;
  padding: 10px 10px;
  border: none;
}

.icon-change-avatar {
  position: absolute;
  bottom: 5px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
