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
import { Toast, Tabbar, TabbarItem } from "vant";
export default {
  name: "app",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      isshowAPP: true,
      originalHeight: "",
      key: "981aeb7ed773a795f25e742b7cb05950" //高德地图
    };
  },
  created() {
    this.getLocation();
  },

  mounted() {},

  methods: {
    // 获取当前位置
    getLocation() {
      const self = this;
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          console.log("定位成功信息：", data.addressComponent.city);
          self.city = data.addressComponent.city;
        }

        function onError(data) {
          // 定位出错
          console.log("定位失败错误：", data);
          // 调用IP定位
          self.getLngLatLocation();
        }
      });
    },
    // 通过IP获取当前位置
    getLngLatLocation() {
      AMap.plugin("AMap.CitySearch", function() {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            console.log("通过ip获取当前城市：", result);
            // 逆向地理编码
            AMap.plugin("AMap.Geocoder", function() {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              });

              var lnglat = result.rectangle.split(";")[0].split(",");
              geocoder.getAddress(lnglat, function(status, data) {
                if (status === "complete" && data.info === "OK") {
                  // result为对应的地理位置详细信息
                  console.log(data);
                }
              });
            });
          }
        });
      });
    }
  }
};
</script>

<style lang='less' scoped>
.view {
  background: #f2f3f5;
  position: absolute;
  top: 0;
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
