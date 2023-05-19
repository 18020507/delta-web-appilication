<template>
  <div class="container">
    <div class="avatar">
      <div class="avatar-img">
        <img :src="avatar_path || require('../../assets/default-avatar.jpg')" />
        <div class="change-avatar-icon">
          <label for="avatar-input">
            <font-awesome-icon icon="fa fa-pencil" class="icon-change-avatar" />
          </label>
          <input
            id="avatar-input"
            type="file"
            @change="handleAvatarChange"
            accept="image/*"
            style="display: none"
          />
        </div>
      </div>
      <div class="avatar-name">{{ username }}</div>
    </div>
    <div class="account-information">
      <div class="column">
        <div class="columnContent">
          <h3>Năm sinh</h3>
          <input type="date" v-model="userForm.birthYear" />
        </div>
        <div class="columnContent">
          <h3>Địa chỉ</h3>
          <input type="text" v-model="userForm.address" />
        </div>
        <div class="columnContent">
          <h3>Quê quán</h3>
          <input type="text" v-model="userForm.hometown" />
        </div>
      </div>
      <div class="column">
        <div class="columnContent">
          <h3>Họ và Tên</h3>
          <input type="text" v-model="userForm.fullName" />
        </div>
        <div class="columnContent">
          <h3>Chức vụ</h3>
          <input type="text" v-model="userForm.position" disabled="disabled" />
        </div>
      </div>
    </div>
    <div class="button-submit-container">
      <button class="button-submit-form" @click="handleSubmit">Cập nhật</button>
    </div>
  </div>
</template>

<script>
import {
  getAccountDetail,
  updateAccount,
  updateAvatar,
} from "@/api/account-management/account-management";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      username: "",
      user_id: null,
      avatar_path: "",
      userForm: {
        birthYear: "",
        address: "",
        hometown: "",
        fullName: "",
        position: "",
      },
    };
  },
  methods: {
    async handleFetch() {
      const res = await getAccountDetail();
      this.username = res.data.data.user_name;
      this.user_id = res.data.data.id;
      this.avatar_path = res.data.data.avatar;
      this.userForm.fullName = res.data.data.full_name;
      this.userForm.position = res.data.data.role_name;
      this.userForm.birthYear = res.data.data.dateOfBirth;
      this.userForm.hometown = res.data.data.homeTown;
      this.userForm.address = res.data.data.address;
    },
    async handleSubmit() {
      const update_res = await updateAccount({
        user_id: this.user_id,
        full_name: this.userForm.fullName,
        date_of_birth: this.userForm.birthYear,
        address: this.userForm.address,
        hometown: this.userForm.hometown,
      });
      if (update_res.status == 200) {
        console.log("success");
        await this.handleFetch();
      }
    },
    async handleAvatarChange(event) {
      const files = event.target.files;
      const image_type = "avatar";
      const payload = new FormData();
      for (let i = 0; i < files.length; i++) {
        payload.append("files", files[i]);
      }
      payload.append("image_type", image_type);
      payload.append("user_id", this.user_id);

      const update_avatar_res = await updateAvatar(payload);
      if (update_avatar_res.status == 200) {
        console.log("success");
        await this.handleFetch();
      }
    },
  },
  async mounted() {
    await this.handleFetch();
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

img {
  width: 120px;
  height: auto;
  border-radius: 50%;
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

.button-submit-container {
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  flex: 1;
}

.button-submit-form {
  font-weight: bold;
  width: 100px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: lightblue;
  cursor: pointer;
}
</style>
