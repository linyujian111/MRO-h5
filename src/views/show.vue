<template>
  <!-- 内容区域 -->

  <div v-if="isshow" class="show" :style="{background: 'url('+bgImgUrl+')' + 'no-repeat'}">
    <div class="bigbox">
      <div class="zhuti">
        <img class="border-img" :src="resData.prizeTitleUrl" alt :style="{width:'100%'}" />
      </div>

      <div class="chanpin">
        <img :src="resData.prizeUrl" alt />
      </div>

      <div class="Xuser">中奖用户</div>
      <div class="inputbox">
        <img src="../assets/image/xxk.png" alt :style="{width:'100%'}" />
      </div>

      <div class="img-info">
        <div class="img-info-name" v-html="resData.nickName"></div>
        <!-- {{changenickName(resData.nickName)}} -->
        <div class="img-info-order">{{resData.orderCode}}</div>
      </div>

      <div class="btnbox">
        <van-button block type="info" native-type="submit" @click="toGoReceiveAward">领取奖品</van-button>
      </div>
    </div>

    <van-popup closeable v-model="show1" class="successPopup">
      <div class="successPopupinfo" style="text-align:center">{{successTip}}</div>
    </van-popup>

    <!-- <div class="main" :style="{height:originalHeight+'px'}">
      <div class="img1-box">
        <div class="cpbox"> 
          <img class="border-img" src="../assets/image/主题框.png" alt :style="{width:'100%'}" />
          </div>
       
        <div class="good-img" :style="{width:'75%'}">
          <div> 
            <img src="../assets/image/产品图.png" alt :style="{width:'100%'}" />
          </div>
          
          
          
        </div>
      </div>
    <div>-->
    <!-- 
      </div>
    </div>-->

    <!-- 没有中奖提示 -->
    <van-popup class="failTip" v-model="isShowFailTip">
      <img class="close-info" src="../assets/image/nowin.png" alt />
      <img class="close-icon" src="../assets/image/close.png" alt @click="isShowFailTip=false" />
    </van-popup>
  </div>
</template>

<script>
import winning from "@/api/winning/winning";
import $http from "axios";
import { Picker, loading, Toast } from "vant";
export default {
  data() {
    return {
      isshow: false,
      ZTimgURL: "",
      show1: false,
      successTip: "222222222222",
      // 模拟中奖数据
      resData: {},
      // 可视区域高度
      originalHeight: "",

      // 背景图
      bgImgUrl: require("../assets/image/showBG.jpg"),

      // 是否提示失败
      isShowFailTip: false,
    };
  },
  created() {
    // 动态获取页面的标题
    this.getTitle();
  },
  mounted() {
    this.getWinningInfo();
    // loginApi.receiveAward()
    //  alert(window.mydata)
    // alert(this.$store.state.name)
    this.isshow = true;

    // setTimeout(() => {
    //   document.querySelector(".show").style.height =
    //     document.body.scrollHeight * 1 + "px";
    // }, 100);
  },

  filters: {},
  methods: {
    getTitle() {
      try {
        let yearMonth;
        let stryearMonth = this.$route.params.yearMonth;
        if (stryearMonth) {
          let str = stryearMonth.split("-")[1];
          if (str[0] == "0") {
            yearMonth = str.substr(1);
          }
        }

        if (yearMonth * 1 <= 12) {
          document.title = yearMonth + "月份中奖名单";
        } else {
          document.title = "中奖名单";
        }
      } catch {
        document.title = "中奖名单";
      }
    },
    // changenickName(val) {
    //   if (val) {
    //     if (val.length >= 4) {
    //       let a = val.substr(0, 1);
    //       let b = val.substr(-1);
    //       let str =  a + "**" + b
    //       return str;
    //     } else {
    //       return val;
    //     }
    //   }
    // },
    // 查询中奖用户
    getWinningInfo() {
      window.localStorage.setItem("isAddToken", "false");

      Toast.loading({
        duration: 0,
        message: "",
        forbidClick: true,
        loadingType: "spinner",
      });

      winning
        .listWinningInfo({
          fromSystem: "LOTTERY_SYSTEM",
          orderCode: null,
          yearMonth: this.$route.params.yearMonth,
        })
        .then((res) => {
          if (res.data.length > 0) {
            window.localStorage.setItem("isAddToken", "true");
            Toast.clear();
            this.resData = res.data[0];
          } else {
            window.localStorage.setItem("isAddToken", "true");
            Toast.clear();
            Toast.fail("查询中奖用户信息失败");
          }
        })
        .catch((err) => {
          window.localStorage.setItem("isAddToken", "true");
        });
    },

    // 领取奖品
    toGoReceiveAward() {
      if (window.localStorage.getItem("WXtoken") == "null") {
        Toast.clear();
        Toast.fail("您尚未授权登录");
        return;
      }

      if (
        window.localStorage.getItem("WXtoken") &&
        window.localStorage.getItem("WXtoken") != "null"
      ) {
        Toast.loading({
          duration: 0,
          message: "",
          forbidClick: true,
          loadingType: "spinner",
        });
        window.localStorage.setItem("isAddToken", "true");

        winning
          .listWinningInfo({
            fromSystem: "LOTTERY_SYSTEM",
            orderCode: null,
            yearMonth: this.$route.params.yearMonth,
          })
          .then((res) => {
            if (res.code == "200") {
              // 如果点击领取奖品，传了token，data不为空[]，则中奖跳转

              // 如果res.data有值，中奖
              if (res.data.length != 0) {

                  // 如果过期expireState == "2"

                if (res.data[0].expireState == "2") {
                  Toast.clear();
                  this.show1 = true;
                  this.successTip = "领奖已过期，无法领奖";


                  // 如果没过期expireState == "1"
                } else if( res.data[0].expireState == "1" ){

                  window.localStorage.setItem(
                    "WXwinningInfo",
                    JSON.stringify(res.data)
                  );
                  Toast.clear();
                  this.$router.push({ path: `/write/${res.data[0].id}` });

                }else{
 Toast.clear();
                   Toast.fail("系统异常");
                }
              } else {
                // 如果点击领取奖品，传了token，data为空[]，则没有中奖
                Toast.clear();
                this.isShowFailTip = true;
              }
            } else if (res.code == "001") {
              Toast.clear();
              Toast.fail("无法获取用户信息，请退出页面重新获取");
            }
          })
          .catch((err) => {
            window.localStorage.setItem("isAddToken", "true");
          });
      } else {
        Toast.clear();
        Toast.fail("您尚未授权登录");
      }
    },
  },
};
</script>

<style lang='less' scoped>
::-webkit-scrollbar {
  /*隐藏滚bai轮*/
  display: none !important;
}

/deep/ .successPopup {
  .successPopupinfo {
    height: 140px;
    padding: 30px;
    width: 235px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    font-size: 16px;
    color: #333333;
    font-weight: bold;
  }
}

/deep/ ::-webkit-scrollbar {
  /*隐藏滚bai轮*/
  display: none !important;
}
/deep/ .van-overlay {
  background-color: rgba(0, 0, 0, 0.35);
}

/deep/ .bigbox {
  width: 100%;
  height: 100%;
  // border: 1px solid red;
  margin-top: 65px;
  position: relative;
  .zhuti {
    position: absolute;
    top: 0px;
    z-index: 2;
  }
  .chanpin {
    width: 284px;
    height: 252px;
    margin: auto auto;
    position: absolute;
    top: 75px;
    left: 46px;
    z-index: 1;
    img {
      width: 284px;
      height: 252px;
    }
  }
  .Xuser {
    width: 100%;
    text-align: center;
    // margin: 15px 0 10px 0;
    color: #333333;
    position: absolute;
    top: 347px;
    left: 0px;
  }

  .btnbox {
    position: absolute;
    top: 508px;
    // left: 125px;
    //  margin-top: 53px;
    // margin-bottom: 48px;
    width: 100%;
    display: flex;
    justify-content: center;
    button {
      width: 140px;
      height: 46px;
      background-color: rgba(59, 59, 59, 1) !important;
      color: rgba(255, 255, 255, 1) !important;
      border-radius: 5px !important;
      margin-bottom: 20px;
    }
  }
  .inputbox {
    width: 284px;
    height: 40px;
    position: absolute;
    top: 376px;
    left: 46px;
  }

  .img-info {
    display: flex;
    flex-direction: row;
    // justify-content: space-between;
    align-items: center;
    min-height: 40px;
    min-width: 280px;
    max-width: 280px;
    position: absolute;
    top: 376px;
    left: 40px;

    .img-info-name {
      min-width: 72px;
      width: 72px;
      height: 25px;
      font-size: 14px;
      color: #333;
      line-height: 25px;
      text-align: left;
      margin-left: 23px;
      word-break: break-all;
      overflow: auto;
      white-space: nowrap;
      margin-right: 19px;
      z-index: 2;
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
      /deep/ ::-webkit-scrollbar {
        width: 0 !important;
      }
    }

    .img-info-order {
      font-size: 14px;
      color: #333;
      width: 159px;
      height: 25px;
      text-align: right;
      line-height: 25px;
      // padding-right: 10px;
      word-break: break-all;
      overflow: auto;
      white-space: nowrap;
      z-index: 2;
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
      /deep/ ::-webkit-scrollbar {
        width: 0 !important;
      }
    }
  }
}
.show {
  min-height: 667px;

  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  background-size: cover !important;
  // background-position: 63% 100% !important;

  .main {
    width: 100%;
    height: 90%;
    border: 0.02667rem solid #ccc;
    /* margin: auto 0; */
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    /* padding: 0.53333rem; */
    display: flex;
    flex-direction: column;
    // align-items: center;
    // justify-content: center;
    align-items: center;
    .img1-box {
      position: relative;
      margin-top: 66px;
      .border-img {
        position: relative;
        top: 0;
        z-index: 200;
      }
      .good-img {
        position: absolute !important;
        top: 74px;
        left: 48px;
      }
    }
  }

  /deep/ .van-button--info {
    border: 1px solid #323233;
  }

  // /deep/ .Xuser {
  //   width: 100%;
  //   text-align: center;
  //   margin: 15px 0 10px 0;
  //   color: #333333;
  // }

  /deep/ .van-popup--center {
    background: unset;
  }
  /deep/ .failTip {
    width: 60%;
    // height:50px;
    .close-info {
      width: 100%;
    }

    .close-icon {
      margin: 13px auto;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: white;
      color: #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>