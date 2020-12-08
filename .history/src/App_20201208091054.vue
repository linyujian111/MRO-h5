<template>
  <div id="app">
    <div v-show="!isshowAPP" class="HPbox">
      <!-- 为了较好的页面体验，请切换至竖屏浏览页面 -->
    </div>
    <keep-alive v-show="isshowAPP">
      <router-view v-if="this.$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-show="isshowAPP" v-if="!this.$route.meta.keepAlive" />

    <!-- <div class="marginbox"></div> -->


  </div>
</template>

<script>
import myPlugins from "vue-plugin-tips-six";

import wechat from "@/api/wechat/wechat";
import user from "@/api/user/user";
import { Toast, Tabbar,
  TabbarItem, } from "vant";
export default {
  name: "app",
    components: {

    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    

  },
  data() {
    return {
      isshowAPP: true,
      originalHeight: "",
    };
  },
  created() {
  },


  mounted() {
    
    
    
  },

  methods: {
   
    
  },
};
</script>

<style lang='less' scoped>

.view{
  background: #f2f3f5;
  position: absolute;
  top:0;
  width: 100%;
  height: 100%;
  overflow: auto;
}
// #app {
//   width: 100%;
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   /* text-align: center; */
//   color: #2c3e50;
// }
// /deep/ .van-search {
//   padding: 6px;
// }
// /deep/ .HPbox {
//   font-size: 12px;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
// /deep/ .marginbox{
//   height:50px;
// }


// /deep/ .van-nav-bar__title{
//   font-size: 15px;
// }
</style>
