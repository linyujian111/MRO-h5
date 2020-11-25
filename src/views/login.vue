<template>
  <!-- 内容区域 -->
  <div class="MRO-login">
    <img src="../assets/image/mrolgbg.jpg" alt="" class="lgbgimg" />

    <div class="login-box">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="账号"
          label="账号："
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码："
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        
        <div class="btnbox flexRC">
          <van-button block type="info" native-type="submit" v-if="isLogin"> 登录 </van-button>
          <!-- <van-button block type="info" v-else> 返回登录 </van-button>

          <van-button block type="info"  @click="isLogin=false"> 修改密码 </van-button> -->
        </div>
      </van-form>
    </div>
    <!-- <div class="login-box"></div> -->
  </div>
</template>

<script>
import { loading, Toast, Form, Field } from "vant";
import { noBackBrowerFn } from "@/utils/noBackBrowerFn";
import login from "@/api/login/login";

export default {
  components: {
    [Toast.name]: Toast,
    [loading.name]: loading,
    [Form.name]: Form,
    [Field.name]: Field,
  },
  data() {
    return {
      isLogin:true,
      username: "",
      password: "",
    };
  },
  created() {},
  mounted() {
    noBackBrowerFn();
  },

  beforeDestroy() {
    window.removeEventListener("popstate", XBack.onPopState, false);
    if (
      window.localStorage.getItem("WXtoken") == "null" ||
      window.localStorage.getItem("WXtoken") == ""
    ) {
      window.localStorage.removeItem("WXtoken");
    }
  },

  methods: {
    onSubmit() {
       this.$router.push({ name: "home" });
      // Toast.loading({
      //   duration: 0,
      //   message: "登录中...",
      //   forbidClick: true,
      //   loadingType: "spinner",
      // });

      // let data = new FormData();
      // // 获取菜单列表
      // data.append("username", this.username);
      // data.append("password", this.password);
      // login
      //   .toLogin(data)
      //   .then((res) => {
      //     if (res.errcode == "ok") {
      //       Toast.clear();
      //       Toast.success(res.errmsg);
      //       setTimeout(() => {
      //         this.$router.push({ name: "home" });
      //       }, 1000);
      //     } else {
      //       Toast.fail("账号密码错误，请重新输入");
      //     }
      //   })
      //   .catch((err) => {
      //     Toast.fail("账号密码错误，请重新输入");
      //   });
      // login.toLogin.post({

      // }).then(res=>{
      //     console.log(res)
      // })
      //
    },
  },
};
</script>

<style lang='less' scoped>
/deep/ input {
  color: rgb(50, 50, 51);
}
/deep/ .van-button--info {
  background-color: rgb(50, 50, 51);
  border: 0.02667rem solid rgb(50, 50, 51);
  border-radius: 5px;
}

/deep/ .van-cell::after {
  border-bottom: 0.02667rem solid rgb(50, 50, 51);
}
.MRO-login {
  min-width: 100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  .lgbgimg {
    position: fixed;
    width: 100%;
    height: 100%;
    display: block;
    z-index: -1;
  }
  .login-box {
    width: 95%;
    min-height: 220px;
    padding:20px 10px;
    border-radius: 10px;
    background: white;
    position: absolute;
    top: 50%;
    margin-top: -100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.1);
    .van-form {
      width: 100%;
      .van-cell {
        background: rgba(255, 0, 0, 0);
        /deep/ .van-field__label {
          color: #646566;
        }
      }
      .btnbox {
        width: 100%;
        max-height: 30px;
        margin-top: 20px;
        button {
          max-width: 100px;
          max-height: 35px;
          margin: 5px;
        }
      }
    }
  }
}
</style>