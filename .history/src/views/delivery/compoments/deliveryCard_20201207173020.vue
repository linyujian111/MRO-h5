<!--
 * @Description:待收货卡片组件
 * @Author: xwq
 * @Date: 2019-10-28 14:39:13
 * @LastEditTime : 2020-01-08 22:22:20
 -->
<template>
  
</template>
<script>
import { lockBackgroundScroll } from "@/utils/backgroundScrollOverly";

import { Toast, NavBar, TreeSelect } from "vant";
var _self;
export default {
  name: "intervalTimeSelect",
  components: {
    [NavBar.name]: NavBar,
    [TreeSelect.name]: TreeSelect,
  },
  props: {},
  data() {
    return {
      active: 0,
      items: [
        {
          text: "系统配置",
          kids: [
            { text: "店铺配置" },
            { text: "数据字段" },
            { text: "用户配置" },
          ],
        },
        {
          text: "采购管理",
          kids: [
            {
              text: "采购申请",
              kids: [
                { text: "我的采购申请" },
                { text: "待办采购申请" },
                { text: "采购申请查询" },
              ],
            },
            { text: "采购订单" },
            { text: "采购变更" },
          ],
        },
        {
          text: "送货收货",
          kids: [
            { text: "采购申请" },
            { text: "采购订单" },
            { text: "采购变更" },
          ],
        },
        {
          text: "库存管理",
          kids: [
            { text: "采购申请" },
            { text: "采购订单" },
            { text: "采购变更" },
          ],
        },
        {
          text: "台账管理",
          kids: [
            { text: "采购申请" },
            { text: "采购订单" },
            { text: "采购变更" },
          ],
        },
        {
          text: "售后管理",
          kids: [
            { text: "采购申请" },
            { text: "采购订单" },
            { text: "采购变更" },
          ],
        },
        {
          text: "异常管理",
          kids: [
            { text: "采购申请" },
            { text: "采购订单" },
            { text: "采购变更" },
          ],
        },
        {
          text: "报表管理",
          kids: [
            { text: "采购申请" },
            { text: "采购订单" },
            { text: "采购变更" },
          ],
        },
        {
          text: "台账管理",
          kids: [
            { text: "采购申请" },
            { text: "采购订单" },
            { text: "采购变更" },
          ],
        },
      ],
    };
  },
  beforeUpdate() {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
      onClickLeft(){
        console.log('333')
          this.$emit('closeIntervalTimeSelect',{})
      }
  },
  /**
   * @Description: 过滤器函数
   * @Param:
   * @Author: xwq
   * @LastEditors: xwq
   * @LastEditTime: Do not edit
   * @return:
   * @Date: 2019-10-18 17:21:56
   */
  filters: {},
};
</script>
<style lang="less" >
.right-TK {
  background: white;
  height: 100%;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1;
  /deep/ .nav2 {
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: linear-gradient(45deg, #07c16054, #1989fa6b);
    margin: 0 5px 5px 5px;
    color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
  }
  /deep/ .nav3 {
    height: 30px;
    margin-left: 20px;
    margin-top: 10px;
  }
}
</style>