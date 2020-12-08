<!--
 * @Description:待收货卡片组件
 * @Author: lyj
 * @Date: 2020-12-07 17:30
 * @LastEditTime : 2020-01-08 22:22:20
 -->

<template>
  <div class="comp">

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
<style lang="less" scoped>
.comp{
    max-width:100%;
    height:200px;
    margin:10px 10px 0px 10px;
    background: white;
    border-radius: 5px;
}

</style>