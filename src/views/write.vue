<template>
  <div class="write-box" v-if="isshow">
    <div class="tipbox">为保证活动公正性，获奖用户如在中奖公布后的1个月内就该订单货品提出退货申请的，将视为其放弃获奖资格。</div>
    <div class="main">
      <!-- <div class="main-button">
                        <van-button @click="toGoReceiveAward" loading-type="spinner">前往领奖</van-button>
      </div>-->
      <van-popup v-model="showArea" position="bottom">
        <van-area
          item-height="1.174rem"
          title="选择地区"
          :area-list="areaList"
          visible-item-count="5"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup>

      <van-popup closeable v-model="show1" class="successPopup">
        <div style="text-align:center">{{successTip}}</div>
      </van-popup>

      <van-form @submit="onSubmit">
        <div class="form-top">
          <van-field
            @input.native="formData.consignee=formData.consignee.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.]/g,'')"
            v-model="formData.consignee"
            name="consignee"
            maxlength="25"
            label="收货人姓名"
            placeholder="请输入收货人姓名"
            :rules="[{ required: true, message: '不能为空' }]"
          ></van-field>

          <van-field
            readonly
            autosize
            name="area"
            v-model="formData.area"
            label="所在地区"
            placeholder="请输入所在地区"
            @click="showArea = true"
            :rules="[{ required: true, message: '不能为空',trigger:'onChange'}]"
          ></van-field>

          <van-field
            type="textarea"
            rows="1"
            autosize
            class="input-item"
            v-model="formData.address"
            name="dz"
            @input.native="formData.address=formData.address.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
            label="详细地址"
            maxlength="50"
            placeholder="请输入详细地址"
            :rules="[{ required: true, message: '不能为空' }]"
          ></van-field>

          <van-field
            v-model="formData.phone"
            @input.native="formData.phone=formData.phone.replace(/[^0-9\.]/g,'')"
            name="phone"
            label="手机号码"
            placeholder="请输入手机号码"
            :error-message="dhErrorMessage"
            :rules="[{ required: true, message: '不能为空' }]"
          ></van-field>
        </div>

        <div class="form-bottom" v-for="(item,index) in winningInfo" :key="index">
          <div class="form-bottom-img">
            <img :src="item.prizeUrl" alt />
          </div>
          <div class="form-bottom-info">
            <div class="form-bottom-info-title">{{item.prizeTitle}}</div>
            <div class="form-bottom-info-good">
              <div class="form-bottom-info-good-name">{{item.prizeName}}</div>
              <div class="form-bottom-info-good-num">
                <span class="x">X</span>
                <span class="n">1</span>
              </div>
            </div>
          </div>
        </div>

        <van-popup v-model="isshownoEditTip">
          <div class="shownoEditTip">
            <div class="info">领奖信息提交后无法修改，是否提交</div>
            <div class="btn">
              <div class="btn1" @click.self="toCanle">取消</div>

              <div class="btn2" @click.self="toSubmit">确认</div>
            </div>
          </div>
        </van-popup>

        <!-- <van-area title="标题" :area-list="areaList" /> -->
        <div class="bottom-button">
          <van-button block type="info" native-type="submit">领取奖品</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import winning from "@/api/winning/winning";
import { Form, Field, RadioGroup, Radio, Area, Toast, Dialog } from "vant";

import areaList from "@/utils/area.js";
export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Area.name]: Area,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      isshownoEditTip: false,
      dhErrorMessage: "",
      successTip: "",
      areaList: {},
      formData: {
        consignee: "",
        area: "",
        phone: "",
        address: "",
      },
      winningInfo: [],
      value: "",
      show1: false,
      show2: false,
      showArea: false,
      isshow: true, //是否显示该页面内容
    };
  },
  created() {
    this.areaList = areaList;

    // 判断是否有权限进入该页面
    let WXwinningInfo = window.localStorage.getItem("WXwinningInfo");

    if (WXwinningInfo) {
      // 如果有权限，则取到中奖信息
      this.winningInfo = JSON.parse(WXwinningInfo);
    } else {
      // 如果没权限，则隐藏页面并提示
      this.isshow = false;

      Toast.fail({
        type: "fail",
        message: "您无权访问该页面",
        icon: "fail",
        duration: 0,
      });
    }
  },
  mounted() {},
  methods: {
    // inputdh(val){

    //   this.formData.dh=val.replace(/\D/g,'')
    // },
    // JYdh() {
    //   if (this.formData.dh.length > 11) {
    //     this.dhErrorMessage = "电话号码错误";
    //     return false;
    //   } else {
    //     this.dhErrorMessage = "";
    //     return true;
    //   }
    // },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /^[1][3,4,5,7,8][\d]{9}$/.test(val);
    },

    onSubmit(values) {
      if (this.formData.phone.length != 11) {
        Toast.fail("手机号码长度为11位数");
        return;
      }
      
this.isshownoEditTip = true;
  //     Dialog.alert({
  //       showCancelButton:true,
  //       title: "标题",
  //       message: "弹窗内容",
  //     }).then(() => {
  //       // on close
  //     }) .catch(() => {
  //   // on cancel
  // });
    },

    toCanle() {
      this.isshownoEditTip = false;
    },

    toSubmit() {
      this.isshownoEditTip = false;

      Toast.loading({
        duration: 0,
        message: "领取中...",
        forbidClick: true,
        loadingType: "spinner",
      });

      winning
        .saveWinningAddressInfo({
          address: this.formData.address,
          area: this.formData.area,
          consignee: this.formData.consignee,
          fromSystem: "LOTTERY_SYSTEM",
          phone: this.formData.phone,
          winningId: this.$route.params.winningId,
        })
        .then((res) => {
          if (res.code == "200") {
            Toast.clear();
            this.successTip = "恭喜您成功领取奖品!";
            this.show1 = true;

            setTimeout(() => {
              this.$router.push({ name: "send" });
            }, 2000);
          } else if (res.code == "2001") {
            Toast.clear();
            this.successTip = res.desc;
            this.show1 = true;
            this.$router.push({ name: "sended" });
          }
        })
        .catch((err) => {
          Toast.clear();
          Toast.fail("领奖失败：" + err);
        });
    },

    //验证手机号的合法性
    ruletellphone(val) {
      let Reg = /^[1][3,4,5,7,8][\d]{9}$/;
      return Reg.test(val);
    },

    onConfirm(values) {
      this.formData.area = values
        .map((item) => {
          if (item) {
            return item.name;
          } else {
            return "";
          }
        })
        .join("/");
      this.showArea = false;
    },
  },
};
</script>

<style lang='less' scoped>

/deep/ .van-popup--center {
  border-radius: 6px;
  overflow: hidden;
}
/deep/ .shownoEditTip {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 270px;
  height: 160px;

  .info {
    font-size: 16px;
    width: 200px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 10px;
    color: #333;
  }
  .btn {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    padding: 0 20px;

    .btn1 {
      width: 100px;
      height: 45px;
      border: 0;
      color: #666;
      font-size: 14px;
      background-color: #edecee;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      // margin-right: 20px;
    }
    .btn2 {
      font-size: 14px;
      width: 100px;
      height: 45px;
      border: 0;
      color: white;
      background-color: black;
      border-radius: 6px;
         display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.write-box {
  height: 100%;
  background-color: #f5f7f8;
  padding-top: 10px;
  padding-right: 12px;
  padding-left: 12px;
  .tipbox {
    margin-top: -2px;
    font-size: 9px;
    line-height: 15px;
    margin-bottom: 6px;
    color: #666;
  }
  .main {
    .form-top {
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    .form-bottom {
      padding: 20px;
      border-radius: 6px;
      overflow: hidden;
      background: white;
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;
      .form-bottom-img {
        width: 70px;
        height: 70px;
        background: #fafafa;
        margin-right: 18px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          max-width: 102%;
          max-height: 102%;
        }
      }

      .form-bottom-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .form-bottom-info-title {
          font-size: 16px;
          color: #333333;
          font-weight: bold;
          margin-bottom: 9px;
        }

        .form-bottom-info-good {
          font-size: 12px;
          color: #666666;
          display: flex;
          justify-content: space-between;
          display: flex;
          margin-bottom: 4px;
          .form-bottom-info-good-name {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
          }

          .form-bottom-info-good-num {
            width: 20px;
            display: flex;
            align-items: center;

            .x {
              font-size: 8px;
              margin-right: 3px;
              color: #333;
              margin-bottom: -4px;
            }
            .n {
              font-size: 16px;

              font-weight: bold;
              color: #333;
              position: relative;
              top: 0px;
            }
          }
        }
      }
    }
  }


  /deep/ .van-cell {
    padding: 10px 20px;
  }

  /deep/ .van-picker__cancel {
    color: #0070ef;
    font-size: 14px;
  }

  /deep/ .van-picker__confirm {
    color: #0070ef;
    font-size: 14px;
  }

  /deep/ .van-button {
    border-radius: 6px;
  }

  /deep/ .van-field__label {
    color: #333;
    font-size: 14px;
  }
  /deep/ .van-picker__title {
    font-weight: bold;
    color: #333333;
  }
  /deep/ .van-cell::after {
    border-bottom: 2px solid #f5f7f8;
  }

  /deep/ .van-button--info {
    background-color: #1f2223;
    border: 0.02667rem solid #323233;
  }

  /deep/ .van-field__control {
    font-size: 14px;
    font-weight: unset;
    font-family: "PingFang SC";
  }

  /deep/ input::-webkit-input-placeholder {
    /* placeholder颜色 */
    color: #c5c5c5;
    font-weight: normal !important;
    font-family: "PingFang SC";
    font-size: 14px;
  }

  // /deep/ .bottom-button {
  //   margin-top: 10px;
  // }

  /deep/ .van-ellipsis {
    font-size: 14px;

    // font-weight: bold;
  }

  /deep/ .van-picker__toolbar {
    border-bottom: 1px solid #f5f7f8;
  }
  // /deep/ .van-picker-column__item{
  //   height: 44px !important;
  // }

  // /deep/ .van-popup--bottom{
  //    height: 200px !important;
  // }

  /deep/ .van-picker__frame {
    width: 100%;
    right: unset !important;
    left: unset !important;
  }

  /deep/ .successPopup {
    height: 140px;
    padding: 30px;
    width: 235px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    font-size: 16px;
    color: #333333;
    font-weight: bold;
  }

  /deep/ .van-popup__close-icon--top-right {
    top: 6px;
    right: 6px;
  }

  /deep/ .van-field--error .van-field__control,
  .van-field--error .van-field__control::placeholder {
    color: #c5c5c5 !important;
  }
}

/deep/ textarea::-webkit-scrollbar {
  /*隐藏滚轮*/
  width: 0;
}
</style>