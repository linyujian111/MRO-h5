<template>
  <!-- 内容区域 -->
  <div>
    <van-search v-model="value" placeholder="请输入搜索关键词" @focus="$router.push({name:'search'})"/>

    <van-swipe :autoplay="3000" style="margin-bottom: 5px">
      <van-swipe-item
        v-for="(image, index) in images"
        :key="index"
        style="display: flex; justify-content: center; align-items: center"
      >
        <img v-lazy="image" style="max-height: 100%" />
      </van-swipe-item>
    </van-swipe>

    <div class="mo-box" style="margin: 10px; background: white">
      <div class="mo-item">
        <div class="mo-item">
          <van-divider class="divider">菜单</van-divider>
          <van-grid
            :border="false"
            :column-num="4"
            square
            :gutter="5"
            style="padding-top: 5px"
          >
            <van-grid-item @click="$router.push({ path: `/category/0` })">
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">主数据管理</div>
            </van-grid-item>
            <van-grid-item @click="$router.push({ path: `/category/1` })">
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">采购管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image
                @click="$router.push({ path: `/category/2` })"
                src="https://img.yzcdn.cn/vant/apple-3.jpg"
              />
              <div class="gridTitle">送货收货</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
              <div class="gridTitle">收货管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">打版管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
              <div class="gridTitle">售后管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">对账管理</div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>

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
.MRO-index {
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


</style>