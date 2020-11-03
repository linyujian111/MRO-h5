<template>
  <!-- 内容区域 -->
  <div class="nofoundbox">
    <div class="imgbox">
      <img style="width:100%;height:100%" src="../assets/image/notFound.png" alt />
    </div>
    <div class="tipbox">
      <div>页面走丢了</div>
      <div>需要重新加载一下</div>
    </div>
    <div class="btnbox">
      <button @click="routerHome">重新加载</button>
    </div>
  </div>
</template>

<script>
import { loading, Toast } from "vant";
import { noBackBrowerFn } from "@/utils/noBackBrowerFn";
export default {
  components: {
    [Toast.name]: Toast,
    [loading.name]: loading,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    noBackBrowerFn();
    // Toast.fail({
    //   type:'fail',
    //   message:'该页面已丢失，请关闭后重新访问',
    //   icon:'fail',
    //   duration:0
    // })
  },
   
  beforeDestroy() {
     window.removeEventListener("popstate", XBack.onPopState, false);
    if (window.localStorage.getItem("WXtoken") == "null" || window.localStorage.getItem("WXtoken") == "") {
      window.localStorage.removeItem("WXtoken");
    }
  },

  methods: {
    routerHome() {
      if (window.localStorage.getItem("WXtoken") == "null" || window.localStorage.getItem("WXtoken") == "") {
        window.localStorage.removeItem("WXtoken");
        window.localStorage.removeItem("WXcode");
      // window.sessionStorage.removeItem("wxappid");
      }

      
      window.location.replace(process.env.VUE_APP_API_FURL + "/#/send");
    },
  },
};
</script>

<style lang='less' scoped>
.nofoundbox {
  height: 100%;
  background-color: rgba(204, 204, 204, 0.14901960784313725);
  .imgbox {
    width: 100%;
    height:350px;
    margin-bottom: 0px;
    img {
      width: 100%;
      height:350px;
    }
  }
  .tipbox {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    font-size: 14px;
    :nth-child(1) {
      color: #333;
      margin-bottom: 5px;
    }
    :nth-child(2) {
      color: #969799de;
    }
  }
  .btnbox {
    width: 100%;
    display: flex;
    justify-content: center;
    button {
      border-radius: 6px;
      width: 120px;
      height: 40px;
      border: 0;
      background-color: rgba(59, 59, 59, 1) !important;
      color: rgba(255, 255, 255, 1) !important;
      font-size: 12px;
    }
  }
}
</style>