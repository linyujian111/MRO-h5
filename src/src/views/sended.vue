<template>
  <div class="sended">
    <div class="main">
      <div>您已提交过领取奖品信息</div>
      <div>
        <button @click="goback">回到首页</button>
      </div>
    </div>
  </div>
</template>

<script>
import { noBackBrowerFn } from "@/utils/noBackBrowerFn";
export default {
  mounted() {
    noBackBrowerFn(); //禁止浏览器返回操作
  },
  beforeDestroy() {
    window.removeEventListener("popstate", XBack.onPopState, false);
  },
  methods: {
    goback() {
      //  window.location.replace(process.env.VUE_APP_API_FURL + "/#/send");
      this.$router.push({ name: "send" });
    },
  },
};
</script>

<style lang='less' scoped>
.sended {
  display: flex;
  justify-content: center;
  .main {
    font-size: 14px;
    color: #666;
    margin-top: -80px;
    position: fixed;
    top: 50%;
    bottom: 50%;
    display: flex;
    flex-direction: column;
    :nth-child(1) {
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
    }
    :nth-child(2) {
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        height: 44px;
        width: 120px;
        border: 0;
        background-color: #1f2223;
        color: white;
        border-radius: 6px;
      }
    }
  }
}
</style>