<template>
  <div></div>
</template>

<script>
import {Toast } from "vant";

export default {
  mounted() {
    let code;

    if (window.location.href.split("?code=").length > 1) {
      code = window.location.href.split("?code=")[1].split("&")[0];
    }
    console.log( process.env.VUE_APP_API_FURL+'/#/send')
    let redirectUri = process.env.VUE_APP_API_FURL+'/#/send';
    let appid = process.env.VUE_APP_API_APPID;
  
    // 如果url上没有code，则进行授权
    // if (!code) {
      let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
      window.location.replace(url);
    // }
  },
};
</script>

<style>
</style>