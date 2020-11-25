<template>
  <!-- 内容区域 -->
  <div>
    <van-search id="search" ref="search" v-model="value" placeholder="请输入搜索关键词"/>

  </div>
</template>

<script>
import {
  loading,
  Toast,
  Form,
  Field,
  TreeSelect,
  Image,
  Grid,
  GridItem,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Divider,
  Tab,
  Tabs,
  Sticky,
  NavBar,
  Search,
  PullRefresh,
} from "vant";
import { noBackBrowerFn } from "@/utils/noBackBrowerFn";
import { URRestRequest } from "@/utils/default";
import intervalTimeSelect from "@/components/calendar/intervalTimeSelect";
import home from "@/api/home/home";

export default {
  components: {
    [intervalTimeSelect.name]: intervalTimeSelect,
    [Toast.name]: Toast,
    [loading.name]: loading,
    [Form.name]: Form,
    [Field.name]: Field,
    [NavBar.name]: NavBar,
    [Image.name]: Image,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Divider.name]: Divider,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Sticky.name]: Sticky,
    [Search.name]: Search,
    [PullRefresh.name]: PullRefresh,
  },
  data() {
    return {
        autofocus:false,
      count: 0,
      value: "",
      isShowIntervalTimeSelect: false,
      queryCondition: {
        name: "",
        code: "",
      },
      queryResult: {
        currPage: 1,
        pageSize: 20,
      },

      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
      ],
    };
  },
  created() {},
  mounted() {
      document.getElementById('search').focus()
    // this.$refs['search'].focus();
    // this.getMenuList();
  },

 
  methods: {
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    onSearch() {},
    onClickLeft() {},
    onClickRight() {},
    closeIntervalTimeSelect() {
      this.isShowIntervalTimeSelect = false;
    },
    getMenuList() {
      console.log("222");

      console.log(URRestRequest);
      var restRequest = new URRestRequest();

      restRequest.addCondition("name", this.queryCondition.name, "like");
      restRequest.addCondition("code", this.queryCondition.code, "like");

      restRequest.setCurrPage(this.queryResult.currPage);
      restRequest.setPageSize(this.queryResult.pageSize);

      home
        .getMenuList(restRequest.getRequestData())
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang='less' scoped>

</style>