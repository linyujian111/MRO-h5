<!--
 * @Description: 区间日期选择组件
 * @Author: xwq
 * @Date: 2019-10-28 14:39:13
 * @LastEditTime : 2020-01-08 22:22:20
 -->
<template>

  <div class="right-TK">
      
    <van-nav-bar
      title="菜单分类"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
   
    />
    <van-tree-select
      height="100%"
      :items="items"
      :main-active-index.sync="active"
    >
      <template #content>
        <div
          v-for="(ite1, index1) in items"
          :key="index1"
          v-if="active === index1"
        >
          <div v-for="(ite2, index2) in ite1.kids">
            <div class="nav2">{{ ite2.text }}</div>
            <div class="nav3" v-for="(ite3, index3) in ite2.kids">
              {{ ite3.text }}
              <span style="position: absolute; right: 10px">></span>
            </div>
          </div>
        </div>
      </template>
    </van-tree-select>
  </div>
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
          text: "主数据管理",
          kids: [
            {
              text: "物料",
              kids: [
                { text: "物料主数据" },
              
              ],
            },
          {
              text: "店铺",
              kids: [
                { text: "店铺主数据" },
              
              ],
              
            },
             {
              text: "货源",
              kids: [
                { text: "货源清单" },
              
              ],
              
            }, {
              text: "供应商",
              kids: [
                { text: "供应商主数据" },
              
              ],
              
            },{
              text: "终端物资主数据",
              kids: [
                { text: "终端物资清单" },
               { text: "历史收货清单" },
              ],
              
            },
          ],
        },
        {
          text: "采购管理",
          kids: [
            { text: "采购申请" ,kids: [
                { text: "我的采购申请" },
                 { text: "待办采购申请" },
                 { text: "采购申请查询" },

              ],},
            { text: "采购订单" ,kids: [
                { text: "我的采购订单" },
                 { text: "待办采购订单" },
                 { text: "采购订单查询" },

              ],},
            { text: "采购变更" ,kids: [
                { text: "我的采购变更" },
                 { text: "待办采购变更" },
                 { text: "采购变更查询" },

              ]},
          ],
        },
        {
          text: "送货收货",
          kids: [
            { text: "送货管理"  ,kids: [
                { text: "我的送货订单" },
                 { text: "待办送货订单" },
                 { text: "送货订单查询" },

              ]},
            { text: "收货管理" ,kids: [
                { text: "我的收货订单" },
                 { text: "待办收货订单" },
                 { text: "收货订单查询" },

              ]},
            { text: "物流管理" ,kids: [
                { text: "物流单号查询" },
             

              ]},
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
  created() {
        this.active = this.$route.params.index*1;
  },
  mounted() {
      console.log('index 参数')

   
  },
  methods: {
      onClickLeft(){
        console.log('333')
        this.$router.push({name:'home'})
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