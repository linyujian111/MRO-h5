<template>
  <div class="userInfo-box">
    <div class="userInfo-item">
      <div class="head">2020年08年中奖用户</div>
      <div class="main">
        <div class="name-tel">
          <div class="name">林女士</div>
          <div class="tel">13658548547</div>
        </div>
        <div class="addr">安徽省淮安市金安区东北大街一来路23号东北大街一来路23号</div>
      </div>
    </div>

    <div class="userInfo-item">
      <div class="head">2020年08年中奖用户</div>
      <div class="main">
        <div class="name-tel">
          <div class="name">林女士</div>
          <div class="tel">13658548547</div>
        </div>
        <div class="addr">安徽省淮安市金安区东北大街一来路23号东北大街一来路23号</div>
      </div>
    </div>

    <div class="userInfo-item">
      <div class="head">2020年08年中奖用户</div>
      <div class="main">
        <div class="name-tel">
          <div class="name">林女士</div>
          <div class="tel">13658548547</div>
        </div>
        <div class="addr">安徽省淮安市金安区东北大街一来路23号东北大街一来路23号</div>
      </div>
    </div>

    <div class="userInfo-item">
      <div class="head">2020年08年中奖用户</div>
      <div class="main">
        <div class="name-tel">
          <div class="name">林女士</div>
          <div class="tel">13658548547</div>
        </div>
        <div class="addr">安徽省淮安市金安区东北大街一来路23号东北大街一来路23号</div>
      </div>
    </div>

    <div class="userInfo-item">
      <div class="head">2020年08年中奖用户</div>
      <div class="main">
        <div class="name-tel">
          <div class="name">林女士</div>
          <div class="tel">13658548547</div>
        </div>
        <div class="addr">安徽省淮安市金安区东北大街一来路23号东北大街一来路23号</div>
      </div>
    </div>

    <div class="userInfo-item">
      <div class="head">2020年08年中奖用户</div>
      <div class="main">
        <div class="name-tel">
          <div class="name">林女士</div>
          <div class="tel">13658548547</div>
        </div>
        <div class="addr">安徽省淮安市金安区东北大街一来路23号东北大街一来路23号</div>
      </div>
    </div>

    <div class="userInfo-item">
      <div class="head">2020年08年中奖用户</div>
      <div class="main">
        <div class="name-tel">
          <div class="name">林女士</div>
          <div class="tel">13658548547</div>
        </div>
        <div class="addr">安徽省淮安市金安区东北大街一来路23号东北大街一来路23号</div>
      </div>
    </div>

    <div class="userInfo-item">
      <div class="head">2020年08年中奖用户</div>
      <div class="main">
        <div class="name-tel">
          <div class="name">林女士</div>
          <div class="tel">13658548547</div>
        </div>
        <div class="addr">安徽省淮安市金安区东北大街一来路23号东北大街一来路23号</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, RadioGroup, Radio, Area } from "vant";
import areaList from "@/utils/area.js";
export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Area.name]: Area,
  },
  data() {
    return {
      areaList: {},
      formData: {
        xm: "",
        dq: "",
        dh: "",
        dz: "",
      },
      value: "",
      show1: false,
      show2: false,
      showArea: false,
    };
  },
  created() {
    document.title = "中奖用户信息";
  },
  mounted() {},
  methods: {},
};
</script>

<style lang='less' scoped>
/deep/ div {
  display: flex;
  color: #333;
  font-size: 14px;
  line-height: 14px;
  min-height: 14px;
}
.userInfo-box {
  height: 100%;
  background-color: #f5f7f8;
  padding-top: 10px;
  padding-right: 12px;
  padding-left: 12px;
  flex-direction: column;
  overflow: auto;
  .userInfo-item {
    width: 100%;

    border-radius: 6px;
    background: white;
    margin-bottom: 12px;
    padding: 18px 20px;
    flex-direction: column;
    .head {
      font-size: 14px;
      width: 100%;
      padding-bottom: 18px;
      border-bottom: 1px solid #f5f5f8;
      margin-bottom: 20px;
      justify-content: space-between;
    }
    .main {
      flex-direction: column;
      .name-tel {
        width: 100%;
        justify-content: space-between;
        .name {
          height: 14px;
          line-height: 14px;
        }
        .tel {
          min-height: 14px;
          line-height: 14px;
        }
      }
      .addr {
        margin-top: 13px;
        line-height: 16px;
      }
    }
  }
}
</style>