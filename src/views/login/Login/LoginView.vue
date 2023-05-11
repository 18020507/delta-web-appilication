<template>
  <form class="login-form">
    <span class="login-form-title"> Admin Login </span>

    <div class="wrap-input">
      <input
        class="input"
        v-model="username"
        type="text"
        name="username"
        placeholder="Username"
      />
      <span class="focus-input"></span>
      <span class="symbol-input">
        <font-awesome-icon icon="fa-solid fa-user" />
      </span>
    </div>

    <div class="wrap-input">
      <input
        class="input"
        v-model="password"
        type="password"
        name="pass"
        placeholder="Password"
      />
      <span class="focus-input"></span>
      <span class="symbol-input">
        <font-awesome-icon icon="fa-solid fa-lock" />
      </span>
    </div>

    <div class="container-login-form-btn">
      <button class="login-form-btn" @click="getLogin">Login</button>
    </div>

    <div class="forgot">
      <span class="txt1"> Forgot </span>
      <a class="txt2" href="#"> Username / Password? </a>
    </div>

    <div class="register">
      <router-link to="/register" class="txt2">
        <span>Create your Account</span>
      </router-link>
    </div>
  </form>
</template>

<script>
import { login } from "@/api/login/login";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async getLogin(event) {
      event.preventDefault();
      const { username, password } = this;
      const response = await login({
        username,
        password,
      });
      if (response.success) {
        this.$router.push("home");
      }
    },
  },
});
</script>

<style scoped>
@font-face {
  font-family: Poppins-Regular;
  src: url("../../../fonts/poppins/Poppins-Regular.ttf");
}

@font-face {
  font-family: Poppins-Bold;
  src: url("../../../fonts/poppins/Poppins-Bold.ttf");
}

@font-face {
  font-family: Montserrat-Bold;
  src: url("../../../fonts/montserrat/Montserrat-Bold.ttf");
}
.login-form {
  width: 290px;
}

.login-form-title {
  font-family: Poppins-Bold;
  font-size: 24px;
  color: #333333;
  line-height: 1.2;
  text-align: center;

  width: 100%;
  display: block;
  padding-bottom: 54px;
}

.wrap-input {
  position: relative;
  width: 100%;
  z-index: 1;
  margin-bottom: 10px;
}

.input {
  font-family: Poppins-Medium;
  font-size: 15px;
  line-height: 1.5;
  color: #666666;

  background: #e6e6e6;
  height: 50px;
  border-radius: 25px;
  padding: 0 30px 0 68px;
}

.symbol-input {
  font-size: 15px;
  display: flex;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 35px;
  pointer-events: none;
  color: #666666;
}

.container-login-form-btn {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 20px;
}

.login-form-btn {
  font-family: Montserrat-Bold;
  font-size: 15px;
  line-height: 1.5;
  color: #fff;
  text-transform: uppercase;

  width: 100%;
  height: 50px;
  border-radius: 25px;
  background: #57b846;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login-form-btn:hover {
  background: #333333;
}

.forgot {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 80px;
}

.register {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.txt1 {
  font-family: Poppins-Regular;
  font-size: 13px;
  line-height: 1.5;
  color: #999999;
  margin-right: 5px;
}

.txt2 {
  font-family: Poppins-Regular;
  font-size: 13px;
  line-height: 1.5;
  color: #666666;
}
</style>
