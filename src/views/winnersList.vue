<template>
  <div class="userInfo-box">
    <div class="userInfo-item" @click="toRouter(item.yearMonth)" v-for="(item,index) in list" :key="index">
      <!-- {{item.yearMonth}} -->
      <img style="width:100%;height:100%" :src="item.picUrl" alt="">
    </div>
  </div>
</template>

<script>
import { Form, Field, RadioGroup, Radio, Area, Toast } from "vant";
import winning from "@/api/winning/winning";
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
      list: [],
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
  created() {},

  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      winning
        .getYearMonth({
          fromSystem: "LOTTERY_SYSTEM",
        })
        .then((res) => {
     
          if (res.code == "200") {

            if (res.data.length!=0) {
              this.list = res.data;
            } else {
              Toast.fail("暂无往期中奖名单");
              this.list = [];
            }
          }
        });
    },
    toRouter(yearMonth) {
      // console.log(yearMonth)
      this.$router.push({ path: `/show/${yearMonth}` });
    },
  },
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
    // width: 100%;
    width: 351px;
    height: 160px;
    min-width: 351px;
    max-width: 351px;
    min-height: 160px;
    overflow: hidden;
    max-height: 160px;
    border-radius: 6px;
    background: white;
    margin-bottom: 12px;
    border-radius: 6px;
    padding: 0;
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