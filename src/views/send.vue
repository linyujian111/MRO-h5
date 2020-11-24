<template>
  <!-- 内容区域 -->

  <div
    class="send"
    :style="{
      background: 'url(' + hello + ')' + 'no-repeat',
      minHeight: originalHeight + 'px',
    }"
  >
    <div
      class="tipImg"
      :style="{ maxHeight: originalHeight + 'px' }"
      @click="isshowTip = false"
      v-show="isshowTip"
    >
      <div style="display:flex">
        <img class="tipImg1" src="../assets/image/01.png" alt="" />
        <img class="tipImg2" src="../assets/image/02.png" alt="" />
      </div>

      <div class="brbox"></div>
    </div>

    <div class="send-box">
      <div class="WQZJ marginCommon" @click="goShowList">
        <img src="../assets/image/oldwin.png" alt />
      </div>

      <div class="ZT marginCommon">
        <img src="../assets/image/zt.png" alt />
      </div>

      <img
        style="width: 100%; height: 100%; display: none"
        src="../assets/image/notFound.png"
        alt
      />

      <div class="TJCJ">
        <div
          class="inputBox"
          :style="{ background: 'url(' + imgurl2 + ')' + 'no-repeat' }"
        >
          <input
            @input="inputformData"
            class="input"
            v-model="formData"
            type="text"
            @focusout="inputBlur"
            placeholder="请输入订单号"
          />

          <!-- <img src="../assets/image/输入框.png" alt /> -->
        </div>

        <img src="../assets/image/sendbtn.png" alt @click="toSubmitLottery" />
      </div>

      <!-- <div class="XSB" >
        
      </div>-->

      <!-- 查看未抽奖订单号 -->
      <div class="WCY marginCommon">
        <img src="../assets/image/wcy.png" alt @click="toSearchOrderNoList" />
        <img class="xsb" src="../assets/image/xsb.png" alt />
      </div>

      <div class="HDTS marginCommon">
        <!-- <img src="../assets/image/sendHDTS.png" alt /> -->
      </div>

      <div class="HDGZ" @click="toShowRules" :style="{ marginTop: originalHeight-60 + 'px' }">
        <img src="../assets/image/sendHDGZ.png" alt />
      </div>
      <!-- 没有中奖提示 -->
      <van-popup class="rulesInfo-popup" v-model="isShowRulesTip">
        <!-- <img class="close-info" src="../assets/image/没中奖插图.png" alt /> -->

        <div class="rulesInfo">
          <div class="rulesInfo-h">
            <img src="../assets/image/hdgzin.png" alt="" />
          </div>

          <div class="rulesInfo-c">
            <div>
              <div class="rulesInfo-title">【活动提示】</div>

              <div>
                <div class="item">
                  •
                  本次活动仅限UR会员参与，每个订单号仅可参与一次抽奖活动，同一个会员ID抽奖次数不限（有多次消费记录的，可用不同订单号参与多次抽奖）
                </div>
                <div class="item">
                  •
                  参与者点击“查看未参与抽奖订单号”，直接点击本月未参与抽奖的订单号参与抽奖。
                </div>
              </div>
            </div>

            <div>
              <div class="rulesInfo-title">【活动规则】</div>

              <div>
                <div class="item">
                  1.参与者根据活动页面提示，使用本月在UR消费所生成的订单号（包括：UR国内实体店铺/UR官网/APP/微商城/小程序消费的订单）参与抽奖；
                </div>
                <div class="item">
                  2.每期抽奖活动期为当月1日至当月最后一天，参与者只能使用当月产生的消费订单号参与抽奖（已提交的订单号如在抽奖期间发起退货申请，视为放弃该订单号抽奖资格）；
                </div>
                <div class="item">
                  3.每期中奖名单将于次月1日活动页面中公布；
                </div>
                <div class="item">
                  4.获奖用户请于中奖名单公布后18天内完成填写个人信息，逾期视作主动放弃获奖资格；
                </div>
                <div class="item">
                  5.UR将在获奖用户完成填写个人信息后的一个月内寄出奖品。
                </div>
              </div>
            </div>
          </div>

          <div class="rulesInfo-b"  >
            <img src="../assets/image/hdgzinB.png" alt="" />
          </div>
        </div>
        <img
          class="close-icon"
          src="../assets/image/close.png"
          alt
          @click="isShowRulesTip = false"
        />
      </van-popup>

      <van-popup closeable v-model="showSuccessTip">
        <div class="successPopup">
          <div class="title">提交成功！</div>
          <div class="info">中奖名单将在下个月1号公布，请留意公示名单</div>
          <div class="btn">
            <Vbutton buttonText="继续参与抽奖" @click="toContinue" />
          </div>
        </div>
      </van-popup>

      <van-popup closeable v-model="showFailTip">
        <div class="successPopup">
          <div class="title">提交失败！</div>
          <div class="info">查无此订单号，请重新填写正确订单号</div>
          <div class="btn">
            <Vbutton buttonText="重新填写订单号" @click="toWriteOrderNo" />
          </div>
        </div>
      </van-popup>

      <van-popup closeable v-model="showChongfuTip">
        <div class="successPopup">
          <div class="title">提交失败！</div>
          <div class="info">该订单号已参与抽奖，请重新输入订单号</div>
          <div class="btn">
            <Vbutton buttonText="重新填写订单号" @click="toWriteOrderNo" />
          </div>
        </div>
      </van-popup>

      <van-popup :close-on-click-overlay="false" v-model="showLoading">
        <!-- <van-loading color="#1989fa" />  -->
        <van-loading type="spinner" />
      </van-popup>

      <van-popup class="chooseOrder" position="bottom" v-model="show">
        <van-picker
          :loading="loading"
          item-height="1.174rem"
          swipe-duration="500"
          :default-index="1"
          :visible-item-count="3"
          title="选择订单号"
          show-toolbar
          :columns="orders"
          @confirm="onConfirm"
          @cancel="onCancel"
          @change="onChange"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { Picker, loading, Toast } from "vant";

import $http from "axios";
import Qs from "qs";
import lottery from "@/api/lottery/lottery";
import { isEmptyObject, getUrlParams } from "@/utils/commonJs";
import { noBackBrowerFn } from "@/utils/noBackBrowerFn";
import wechat from "@/api/wechat/wechat";
import user from "@/api/user/user";

export default {
  components: {
    [Picker.name]: Picker,
    [loading.name]: loading,
  },
  data() {
    return {
      isshowTip: false,
      loading: true,
      formData: "",
      orders: [], //未抽奖的订单号
      code: false,
      imgurl2: require("../assets/image/sendSSK.png"),
      hello: "hello123",
      show: false,
      showLoading: false,
      isShowRulesTip: false,
      showSuccessTip: false,
      showFailTip: false,
      showChongfuTip: false,
      originalHeight2: "",
      originalHeight: "",
      hello: require("../assets/image/sendBG1.jpg"),
      wechatScope: {
        base: "snsapi_base", // snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid）
        userinfo: "snsapi_userinfo", //
      },
    };
  },
  created() {
    
  },

  beforeDestroy() {
    window.removeEventListener("popstate", XBack.onPopState, false);
  },

  mounted() {

   

setTimeout(() => {
  // 判断是否首次进入，提示引导图------------------------------------
 
    let isFirstEnter = window.localStorage.getItem("isFirstEnter");
    // 如果有值说明 不是首次进入
    if (isFirstEnter) {
      this.isshowTip = false;
    } else {
      this.isshowTip = true;
      window.localStorage.setItem("isFirstEnter", "true");
    }
    // 判断是否首次进入，提示引导图------------------------------------
}, 500);
    // window.scrollBy(0, 500 )
    // setTimeout(() => {
    //       document.querySelector(".send-box").scrollTop=500;
    // document.querySelector("body").scrollTop=500;
    // document.querySelector("html").scrollTop=500;
    // }, 1000);

    //      window.scrollTo(0, 500)
    // var l = document.querySelector(".send");
    var a = document.querySelector("#app");
    // var s = document.querySelector(".send-box");
    // var b = document.querySelector("body");
    // var h = document.querySelector("html");
    var r = document.querySelector(".tipImg");

    // l.addEventListener("scroll", function () {
    //   console.log("l");
    // });

    // b.addEventListener("scroll", function () {
    //   console.log("b");
    // });

    // h.addEventListener("scroll", function () {
    //   console.log("h");
    // });
    //   s.addEventListener("scroll", function () {
    //   console.log("s");
    // });
    a.addEventListener("scroll", function () {
      console.log("a");
    });
  

    r.addEventListener("scroll", function () {
      a.scrollTop = r.scrollTop;
    });
    //       document.querySelector(".send").scrollTop = r.scrollTop;
    // b.scrollTop = r.scrollTop;
    // h.scrollTop = r.scrollTop;
    //       console.log("监听滚动");
    //         console.log('html'+l.scrollTop);

    //         console.log('body'+l.scrollTop);

    //         console.log('send'+l.scrollTop);
    //   console.log('tip'+ r.scrollTop);

    this.getToken(); // 从404进来首页后，token被重置为null，故重新授权Token

    noBackBrowerFn(); //禁止浏览器返回操作

    // 布局页面高度
    this.originalHeight =
      (document.documentElement.clientHeight || document.body.clientHeight) *
        1 +
      1;
    this.originalHeight2 = this.originalHeight / 2 - 140;
  },

  methods: {
    getToken() {
      if (window.localStorage.getItem("WXtoken") == "null") {
        wechat
          .getToken({
            code: window.localStorage.getItem("WXcode"),
            fromSystem: "LOTTERY_SYSTEM",
          })

          .then((res) => {
            // 获取到token 存在本地
            if (res.data) {
              window.localStorage.setItem("WXtoken", res.data);
              // 并继续获取用户信息
              user
                .getUserInfo({
                  fromSystem: "LOTTERY_SYSTEM",
                })
                .then((res) => {
                  window.localStorage.setItem(
                    "WXuserInfo",
                    JSON.stringify(res.data)
                  );
                });
            } else {
              // 没有获取到token，则重新授权
              Toast.fail("获取微信授权失败,请退出页面重新获取授权");
              // this.$router.push({ name: "shouquan" });
            }
          });
      }
    },
    inputformData() {
      this.formData = this.formData.replace(/[^0-9A-Za-z]/gi, "");
      this.formData = this.formData.toUpperCase();
    },
    backChange() {
      if (window.location.href.split("#/")[1] == "send") {
        window.location.reload();
        return false;
      } else {
        return true;
      }

      //
    },
    // 处理ios 键盘收回页面不收回bug
    inputBlur(e) {
      if (
        e &&
        e.target &&
        e.target.tagName &&
        e.target.tagName.toLowerCase() === "input"
      ) {
        // 输入框失去焦点，要把iOS键盘推出页面的滚动部分还原。即将页面滚动到视窗顶部对齐
        this.timer = setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
      }
    },

    // 往期中奖名单
    goShowList() {
      this.$router.push({ name: "winnersList" });
    },

    // 提交抽奖
    toSubmitLottery() {
      if (this.formData) {
        Toast.loading({
          duration: 0,
          message: "提交抽奖中...",
          forbidClick: true,
          loadingType: "spinner",
        });

        lottery
          .saveLotteryOrder({
            fromSystem: "LOTTERY_SYSTEM",
            orderCode: this.formData,
          })
          .then((res) => {
            if (res.code == "200") {
              Toast.clear();
              this.showSuccessTip = true;
            } else if (res.code == "1001") {
              Toast.clear();
              this.showFailTip = true;
            } else if (res.code == "1002") {
              Toast.clear();
              this.showChongfuTip = true;
            }

            this.formData = "";
          })
          .catch((err) => {
            Toast.clear();
            Toast.fail(err);
            // this.showFailTip = true;
            this.formData = "";
          });
      } else {
        Toast.clear();
        Toast.fail("请输入订单号");
      }
    },

    toWriteOrderNo() {
      this.formData = "";
      this.showFailTip = false;
      this.showChongfuTip = false;
    },

    toContinue() {
      this.formData = "";
      this.showSuccessTip = false;
    },
    // 查看未参与抽奖的订单
    toSearchOrderNoList() {
      Toast.loading({
        duration: 0,
        message: "正在查询...",
        forbidClick: true,
        loadingType: "spinner",
      });
      // 查找未参与抽奖的订单号
      this.loading = true;

      lottery
        .getOrders({
          fromSystem: "LOTTERY_SYSTEM",
        })
        .then((res) => {
          if (res.code == 200) {
            if (res.data.orders.length > 0) {
              Toast.clear();
              this.orders = res.data.orders;
              this.show = true;
              this.loading = false;
              Toast.clear();
            } else {
              Toast.clear();
              this.loading = false;
              this.show = false;
              Toast.fail("暂无订单");
            }
          }
        })
        .catch((err) => {
          this.loading = false;
          Toast.fail(err);
        });
    },

    // 弹出活动规则
    toShowRules() {
      this.isShowRulesTip = true;
    },

    // 确认订单号
    onConfirm(val) {
      this.formData = val;
      this.show = false;

      // console.log()
    },

    // 取消选订单号
    onCancel(val) {
      this.show = false;
    },

    // 改变订单号
    onChange(val) {},
  },
};
</script>

<style lang='less' scoped>
/deep/ .van-picker__loading {
  background-color: rgba(97, 97, 97, 0.30980392156862746);
}

/deep/ .tipImg {
  width: 100%;
  // height: 669px;
  overflow: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  .tipImg1 {
    width: 100%;
    height: 658px;

    // margin-left: -5px;
  }
  .tipImg2 {
    position: absolute;
    top: 530px;
    left: 110px;
    width: 130px;
    margin-top: -5px;
    // margin-left: -5px;
  }
  .brbox {
    flex: 1;
    background: rgba(0, 0, 0, 0.5);
  }
}

.send {
  height: 667px;
  color: white;
  display: flex;
  flex-direction: column;
  margin-top: -1px;
  overflow: auto;
  background-size: 100% 100% !important;

  // background-position: 63% 100% !important;

  /deep/ img {
    max-width: 100%;
    max-height: 100%;
  }

  .WQZJ {
    height: 44px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    img {
      width: 84px;
      height: 12px;
      margin-right: 24px;
    }
  }

  .ZT {
    width: 108.6px;
    height: 50.6px;
    max-width: 108.6px;
    max-height: 50.6px;
    margin-top: 197px;

    margin-bottom: 10px;
  }

  .TJCJ {
    width: 100%;
    margin-bottom: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
    .inputBox {
      width: 200px;
      height: 39px;
      margin-right: 4px;
      background: rgba(204, 204, 204, 0);
      border: 0;
      padding: 0 15px;
      color: black;
      display: flex;
      background-size: 100% 100% !important;
      input {
        flex: 1;
        max-width: 100%;
        font-size: 12px;
        // min-width: 200px;
        height: 39px;
        margin-right: 4px;
        background: rgba(204, 204, 204, 0);
        border: 0;
        width: 100%;

        color: black;
      }
    }

    :nth-child(2) {
      width: 100px;
      height: 39px;
    }
  }

  // 查看未参与抽奖订单号
  .WCY {
    width: 119px;
    height: 15px;
    margin-bottom: 18px;
    position: relative;
    .xsb {
      position: absolute;
      left: 185px;
      width: 23px;
      min-height: 25px;
    }
  }

  .HDTS {
    width: 309px;
    height: 67px;
    margin-bottom: 25px;
  }

  .HDGZ {
    position: absolute;
    top: 0px;
    left: 150px;
    height: 12px;
    width: 56px;
    display: flex;
    img {
      height: 12px;
      width: 56px;
    }
  }
  .XSB {
    max-height: 50px;
  }

  /deep/ .marginCommon {
    margin-left: 36px;
  }

  /deep/ .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-top: 0 solid #616161 !important;
    border-bottom: 0 solid #616161 !important;
  }

  /deep/ .van-picker__frame {
    right: 0;
    left: 0;
  }

  /deep/ .van-hairline-unset--top-bottom::after {
    border-top: 2px solid #616161 !important;
    border-bottom: 2px solid #616161 !important;
  }
  /deep/ .van-picker-column {
    background: rgba(0, 0, 0, 0.6);
  }
  /deep/ .van-picker__toolbar {
    background-color: rgba(0, 0, 0, 0.6);
    border-bottom: 1px solid #616161;
  }

  /deep/ .van-picker-column__item {
    font-size: 12px;
    color: #969799;
    background-image: unset !important;
  }
  /deep/ .van-picker__mask {
    background-image: unset !important;
  }
  /deep/ .van-icon {
    margin-bottom: -2px;
    font-size: 12px;
  }
  /deep/ .van-picker-column__item--selected {
    font-size: 14px;
    color: white;
  }

  /deep/ .van-popup {
    background-color: rgba(255, 255, 255, 0);
    .van-picker {
      background-color: rgba(255, 255, 255, 0);

      color: white;
      border-bottom: 1px solid #616161;
      button {
        background: unset !important;
      }
    }
  }
  /deep/ .van-overlay {
    background: unset;
  }
}

.send-box {
  height: 100%;
  // background: #3232334a;

  .send-list {
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    color: white;
    align-items: center;
    margin: 32px 24px 0 0;
  }
  .send-info {
    height: 100px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    padding: 0 30px;
    flex-direction: column;
    font-size: 12px;
    font-family: "PingFang SC";
    .info-top {
      color: white;

      margin: 10px 0 10px 0;
      font-family: "PingFang SC";
      .info-top-1 {
        font-size: 16px;
        color: white;
      }

      .info-top-2 {
        font-size: 25px;
        font-weight: bolder;
        color: white;
      }
    }
    .info-bottom {
      color: white;
      font-size: 12px;
      margin: 10px 0 20px 0;
      font-family: "PingFang SC";
    }

    .info-tips {
      .info-tips-title {
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .info-tips-info {
        font-size: 10px;
        margin-bottom: 20px;

        .info-tips-info-1 {
          margin-bottom: 2px;
        }
      }
    }

    .info-center {
      display: flex;

      button {
        min-width: 90px;
        height: 44px;

        border: 0;
        font-size: 14px;
        border-radius: 5px 5px 5px 5px;
      }
      input {
        height: 44px;
        background: #f7f8fa9e;
        border: 0;
        flex: 1;
        border-radius: 4px;
        font-size: 14px;
        padding: 0 10px;
        margin-right: 5px;
        border: 2px solid black;
        border-radius: 30px;
      }
    }

    .info-rules {
      font-size: 12px;
      font-weight: bold;
      display: flex;
      align-items: center;
      ::before {
        // font-weight: bold;
        margin-left: 1px;
        margin-top: 2px;
      }
    }
  }

  /deep/ button {
    background-color: #000000b5 !important;
    color: rgba(255, 255, 255, 1) !important;
    border-radius: 5px !important;
  }
}

/deep/ .rulesInfo-popup {
  width: 310px;
      min-height: 450px;
   min-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .rulesInfo {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    // padding: 18px 18px 24px 18px;
    font-size: 14px;
    color: black;
    width: 100%;
    min-height: 400px;
    max-height: 350px;
    border-radius: 12px;
    background: white;
    background: white;
    margin-bottom: 20px;
    .rulesInfo-h {
      min-height: 49px;
      height: 49px;
      text-align: center;
      font-weight: bold;
      font-size: 16px;
      line-height: 16px;
      img {
        
        width: 100%;
      }
    }

    .rulesInfo-c {
      padding: 0px 20px 20px 20px;
      flex: 1;
      height: 200px;
      min-height: 200px;
      // max-height: 300px;
      overflow: auto;

      .item {
        font-size: 13px;
        margin-bottom: 5px;
      }
      .rulesInfo-title {
        margin: 15px -6px;
        font-weight: bold;
        font-size: 14px;
        text-align: left;
      }
    }
    .rulesInfo-b {
      height: 32px;
      min-height: 32px;
      width: 100%;
      img {
        width: 100%;
      }
    }
    // div {
    //   margin-bottom: 10px;
    //   word-break: break-all;
    // }

    .item {
      line-height: 20px;
      font-size: 14px;
    }
  }
  img {
    width: 50px;
  }
}

// .info-center {
//   width: 100%;
//   display: flex;
//   flex-direction: row;
// }

// .info-top,
// .info-bottom {
//   color: rgba(16, 16, 16, 1);
//   font-size: 14px;
//   margin: 10px 0;
//   font-family: "PingFang SC", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "Hiragino Sans GB",

// }

/deep/ .van-icon {
  font-size: 16px !important;
  margin-top: -7px;
  margin-right: -7px;
}

/deep/ .successPopup {
  width: 280px;
  height: 197px;
  border-radius: 6px;
  background: white;
  color: #333;
  display: flex;
  flex-direction: column;

  // justify-content: center;
  .title {
    margin-top: 38px;
    text-align: center;
    margin-bottom: 12px;
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
  }

  .info {
    text-align: center;
    font-size: 12px;
  }

  .btn {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 38px;
    margin-top: 30px;
    /deep/ .defaultBtn {
      height: 48px;
      width: 182px;
      background-color: #333 !important;
      border-color: #333 !important;
    }
  }
}

// /deep/
</style>