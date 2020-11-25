<template>
  <!-- 内容区域 -->
  <div class="MRO-index">
 

    <router-view />

    <van-tabbar route>
      <van-tabbar-item replace to="/index" icon="home-o"> 首页 </van-tabbar-item>
      <van-tabbar-item replace to="/pending" icon="home-o"> 待办 </van-tabbar-item>
      <!-- <van-tabbar-item replace to="/mine" icon="search"> 我的 </van-tabbar-item> -->
    </van-tabbar>
  
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
    noBackBrowerFn();

    // this.getMenuList();
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
/deep/ .van-tree-select__nav {
  background: linear-gradient(45deg, #07c16073, #1989fa5c);
}

/deep/ .van-sidebar-item {
  background: rgba(255, 255, 255, 0);
}

/deep/ .van-sidebar-item--select,
.van-sidebar-item--select:active {
  background: white;
}


/deep/ .divider {
  border-color: rgba(25, 137, 250, 0.4117647058823529);
  color: #323233;
  padding: 0px 16px;
  margin-top: 0px;
  margin-bottom: 5px;
  border-radius: 2px;
  background: linear-gradient(45deg, #1989fa42, #07c1602e);
}
/deep/ .van-grid-item__content--center {
  border: 1px solid #32323317;
       box-shadow: 2px 2px 2px #cccccc54;
    border-radius: 10px;

}

/deep/ .gridTitle {
  font-size: 12px;
  color: rgb(100, 101, 102);
}

.mo-box {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: auto;

  .mo-item {
    flex: 1;
    // margin:5px ;
    min-width: 150px;
  }
}

/deep/ .van-swipe-item {
  background: white;
}

/deep/ .van-swipe__track {
  height: 150px;
}

/deep/ .van-search {
  padding: 6px;
}
</style>