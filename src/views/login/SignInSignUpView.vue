<template>
  <div class="container">
    <div class="wrap-content">
      <div class="content">
        <div class="image-logo">
          <img src="../../assets/img-01.png" />
        </div>
        <div class="content-page">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
}

.wrap-content {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: #9053c7;
  background: -webkit-linear-gradient(-135deg, #c850c0, #4158d0);
  background: -o-linear-gradient(-135deg, #c850c0, #4158d0);
  background: -moz-linear-gradient(-135deg, #c850c0, #4158d0);
  background: linear-gradient(-135deg, #c850c0, #4158d0);
}

.content {
  width: 800px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  padding: 177px 130px 33px 95px;
}

.image-logo {
  width: 316px;
}

.content-page {
  height: 400px;
}
</style>
