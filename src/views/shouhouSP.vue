<template>
  <!-- 内容区域 -->
  <div class="shouhouSP">
    <van-nav-bar
  title="售后维修单查看"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"

/>
      <!-- <van-divider
  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
>
  售后维修单查看 -->
<!-- </van-divider> -->
    <van-form @submit="onSubmit" disabled>
      <div class="item">
        <div class="item-tittle">维修信息</div>
        <van-field
        disabled
          v-model="username"
          name="维修编号"
          label="维修编号"
        />
      </div>

      <div class="item">
        <div class="item-tittle">店铺信息</div>
        <van-field
        disabled
          v-model="password"
          name="店铺编号"
          label="店铺编号"
        />

        <van-field
        disabled
          v-model="password"
          name="店铺名称"
          label="店铺名称"
        />

        <van-field
        disabled
          v-model="password"
          name="区域"
          label="区域"
        
        />

        <van-field
        disabled
          v-model="password"
          name="品牌"
          label="品牌"
        />

        <van-field
        disabled
          v-model="password"
          name="店铺性质"
          label="店铺性质"
        />

        <div style="height:30px;line-height:30px;background:white;text-align:center;font-weight:bolder;font-size:12px;color: #1989fad1;" @click="showSHOP=!showSHOP">{{showSHOP?'收起':'...'}}</div>
        <div v-if="showSHOP">
 <van-field
        disabled
          v-model="password"
          name="店铺电话"
          label="店铺电话"
        />

        <van-field
        disabled
          v-model="password"
          name="开业日期"
          label="开业日期"
        />

        <van-field
        disabled
          v-model="password"
          name="店铺形象"
          label="店铺形象"
        />

        <van-field
          v-model="password"
          name="店铺地址"
          label="店铺地址"
        />
        
        <van-field
          v-model="password"
          name="店铺负责人"
          label="店铺负责人"
        />
             <van-field
          v-model="password"
          name="负责人手机"
          label="负责人手机"
        />
         <van-field
          v-model="password"
          name="负责人对接人"
          label="负责人对接人"
        />
          <van-field
          v-model="password"
          name="对接人手机"
          label="对接人手机"
        />
        </div>
       
      </div>

      <div class="item" style="display: flex; flex-wrap: nowrap">
            <div class="item-tittle">问题情况</div>
        <div class="item1" v-for="item in 10" :key="item">
          <van-field
            v-model="password"
            name="物料名称"
            label="物料名称"
           disabled
          />

          <van-field
            v-model="password"
            name="问题"
            label="问题"
           disabled
          />

          <van-field
            v-model="password"
            name="问题描述"
            label="问题描述"
           disabled
          />

          <van-field
            v-model="password"
            name="报修数量"
            label="报修数量"
            disabled
          />

          <van-field
            v-model="password"
            name="单位"
            label="单位"
           disabled
          />
        </div>
      </div>
      <!-- <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div> -->
    </van-form>
  </div>
</template>

<script>
import { loading, Toast, Form, Field,divider,NavBar } from "vant";

import { noBackBrowerFn} from "@/utils/noBackBrowerFn";
export default {
  name:'',
  components: {
    [Toast.name]: Toast,
    [loading.name]: loading,
    [Form.name]: Form,
    [Field.name]: Field,
    [divider.name]: divider,
      [NavBar.name]: NavBar
  },
  data() {
    return {
        showSHOP:false,
      username: "",
      password: "",
    };
  },
  created() {},
  mounted() {},

  beforeDestroy() {},

  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    onClickLeft(){
      this.$router.push({name:'pending'})
    }
  },
};
</script>

<style lang='less' scoped>
/deep/ .van-field__label {
  font-size: 12px;
}

/deep/ ::input-placeholder {
  font-size: 12px;
  color: red;
}
.shouhouSP {
  font-size: 14px;
  .item {
    margin: 5px;
    background: rgba(135, 206, 235, 0.47058823529411764);
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid rgba(135, 206, 235, 0.47058823529411764);
    box-shadow: 2px 2px 2px rgba(135, 206, 235, 0.47058823529411764);
    overflow: auto;

    .item1 {
      background: white;
      height: 50px;
       min-width: 280px;
      max-width: 280px;
      height: 220px;
      margin: 2px;
      border-radius: 5px;
      box-shadow: 2px 2px 2px rgba(135, 206, 235, 0.47058823529411764);
      overflow: hidden;
       &:nth-child(n) {
        margin-right:2px;
  }
    }
    .item-tittle {
            display: flex;
    justify-content: center;
    align-items: center;
      text-align: center;
      margin: 2px;
      font-size: 14px;
    }
  }
}
</style>