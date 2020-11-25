<template>
  <div class="DB">
      <van-tabs v-model="active" sticky :offset-top="0">
        <van-tab title="采购">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <van-grid
                :border="false"
                :column-num="2"
                square
                :gutter="5"
                style="padding-top: 5px"
              >
                <van-grid-item @click="$router.push({path:`/shouhouSP/1`})">
                  <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
                  <div class="gridTitle">采购管理</div>
                </van-grid-item>
                <van-grid-item>
                  <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
                  <div class="gridTitle">送货管理</div>
                </van-grid-item>
                <van-grid-item>
                  <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
                  <div class="gridTitle">收货管理</div>
                </van-grid-item>
                <van-grid-item>
                  <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
                  <div class="gridTitle">打版订单</div>
                </van-grid-item>
                <van-grid-item>
                  <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
                  <div class="gridTitle">售后订单</div>
                </van-grid-item>
                <van-grid-item>
                  <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
                  <div class="gridTitle">采购对账</div>
                </van-grid-item>
                <van-grid-item>
                  <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
                  <div class="gridTitle">售后对账</div>
                </van-grid-item>
              </van-grid>
            </van-list>
          </van-pull-refresh>
        </van-tab>

        <van-tab title="打版">
          <van-grid
            :border="false"
            :column-num="2"
            square
            :gutter="5"
            style="padding-top: 5px"
          >
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">采购管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
              <div class="gridTitle">送货管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
              <div class="gridTitle">收货管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">打版订单</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
              <div class="gridTitle">售后订单</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">采购对账</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">售后对账</div>
            </van-grid-item>
          </van-grid></van-tab
        >
        <van-tab title="售后">
          <van-grid
            :border="false"
            :column-num="2"
            square
            :gutter="5"
            style="padding-top: 5px"
          >
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">采购管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
              <div class="gridTitle">送货管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
              <div class="gridTitle">收货管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">打版订单</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
              <div class="gridTitle">售后订单</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">采购对账</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">售后对账</div>
            </van-grid-item>
          </van-grid></van-tab
        >
        <van-tab title="送货">
          <van-grid
            :border="false"
            :column-num="2"
            square
            :gutter="5"
            style="padding-top: 5px"
          >
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">采购管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
              <div class="gridTitle">送货管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
              <div class="gridTitle">收货管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">打版订单</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
              <div class="gridTitle">售后订单</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">采购对账</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">售后对账</div>
            </van-grid-item>
          </van-grid></van-tab
        >
        <van-tab title="收货">
          <van-grid
            :border="false"
            :column-num="2"
            square
            :gutter="5"
            style="padding-top: 5px"
          >
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">采购管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
              <div class="gridTitle">送货管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
              <div class="gridTitle">收货管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">打版订单</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
              <div class="gridTitle">售后订单</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">采购对账</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">售后对账</div>
            </van-grid-item>
          </van-grid></van-tab
        >
        <van-tab title="对账">
          <van-grid
            :border="false"
            :column-num="2"
            square
            :gutter="5"
            style="padding-top: 5px"
          >
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">采购管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
              <div class="gridTitle">送货管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
              <div class="gridTitle">收货管理</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">打版订单</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
              <div class="gridTitle">售后订单</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">采购对账</div>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <div class="gridTitle">售后对账</div>
            </van-grid-item>
          </van-grid></van-tab
        >
      </van-tabs>
 
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
  List,
} from "vant";
export default {
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Divider.name]: Divider,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Sticky.name]: Sticky,
    [PullRefresh.name]: PullRefresh,
    [Image.name]: Image,
    [NavBar.name]: NavBar,
    [List.name]: List,
  },
  data() {
    return {
      count: "",
      active: 0,
      value: "",
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
  
    };
  },
  
  methods: {
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
   
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  },
};
</script>

<style lang='less' scoped>

</style>