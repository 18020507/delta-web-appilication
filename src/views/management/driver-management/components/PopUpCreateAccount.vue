<template>
  <div class="container">
    <h4>Tạo tài khoản cho lái xe {{ driverName }}</h4>
    <div class="guide">
      <span><b>Chú ý: quy tắc đặt tên</b></span>
      <span>Tên lái xe (viết liền không dấu) - Năm sinh</span>
      <span>Ví dụ: NguyenVanHien96</span>
    </div>
    <form class="driver-register-form">
      <div class="wrap-input">
        <span>Tên đăng nhập</span>
        <input class="input" v-model="localUsername" />
      </div>
      <div class="wrap-input">
        <span>Số điện thoại</span>
        <input class="input" v-model="localPhonenumber" />
      </div>
      <div class="wrap-input">
        <span>Mật khẩu</span>
        <font-awesome-icon
          icon="fa-solid fa-rotate"
          @click="generatePassword"
        />
        <input class="input" v-model="password" />
      </div>

      <div class="container-driver-register-form-btn">
        <button class="login-form-btn" @click="register">Tạo Tài Khoản</button>
      </div>
    </form>
  </div>
</template>

<script>
import { createDriverAccount } from "@/api/driver-management/driverManagement";
import { useNotification } from "@kyvg/vue3-notification";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    driverName: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    driverId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      password: "",
      localUsername: this.username,
      localPhonenumber: this.phonenumber,
    };
  },
  methods: {
    generatePassword() {
      const chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let result = "";
      for (let i = 0; i < 8; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      this.password = result;
    },
    async register(event) {
      event.preventDefault();
      const response = await createDriverAccount({
        role_id: 3,
        full_name: this.driverName,
        user_name: this.localUsername,
        password: this.password,
        driver_id: this.driverId,
        phone_number: this.localPhonenumber,
      });
      if (response.success) {
        this.$emit("registration-success");
        console.log("Tạo tài khoản thành công");
        const notification = useNotification();
        notification.notify({
          title: "Tạo tài khoản thành công",
          text: `Đã tạo tài khoản thành công cho lái xe ${this.driverName}, mật khẩu ${this.password}`,
          type: "success",
          duration: 3000,
        });
      }
    },
  },
});
</script>

<style scoped>
.wrap-input {
  display: flex;
  justify-content: space-between;
  margin: 10px;
}
.input {
  margin-left: 10px;
}
.guide {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.container-driver-register-form-btn {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 10px;
}
</style>
