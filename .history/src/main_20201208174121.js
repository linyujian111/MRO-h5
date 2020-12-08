const isPro = process.env.NODE_ENV === 'production';
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import './utils/request';
import './utils/default';
// import Vconsole from 'vconsole';  //移动端log控制台输出测试插件
import './utils/androidBack'; //引入Hbuilder打包app监听物理键返回的处理方法
// import './utils/getGolacation'; //引入Hbuilder打包定位的处理方法
import 'amfe-flexible/index.js';

import Storage from 'vue-web-storage';
import installComponent from '@/components/Height_components/index.js';
import myPlugins from 'vue-plugin-tips-six';


import BScroll from 'better-scroll'
// let app = document.querySelector('body')//body的id
// let scroll = new BScroll(app) //实例化
// let isok = new BScroll(app, {click: true});

import {
    Cell,
    CellGroup,
    Button,
    Icon,
    Popup,
    Search,
    Dialog,
    Toast,
    Lazyload,
    Row,
    Col,
} from 'vant';

Vue.use(Cell)
    .use(CellGroup)
    .use(Button)
    .use(Icon)
    .use(Popup)
    .use(Search)
    .use(Dialog)
    .use(Toast)
    .use(Lazyload)
    .use(Row)
    .use(Col);
Vue.use(myPlugins);
//实例化插件
// if (!isPro) {
//     const vConsole = new Vconsole();
//     Vue.use(vConsole);
// }
Vue.use(installComponent);
//本地缓存插件
// Vue.use(Storage, {
//     prefix: 'APPInfo',// default `app_`
//     drivers: ['session', 'local'], // default 'local'
// });
// Vue.prototype.$local = Vue.$localStorage;
// Vue.prototype.$session = Vue.$sessionStorage;
//样式
import 'vant/lib/index.css';
import '@css/commonCss.css';
import '@css/reset.css';
import('vant/lib/icon/local.css');
import 'vue-plugin-tips-six/lib/vue-plugin-tips-six.css';
import { format } from 'core-js/fn/date';

Vue.config.productionTip = false;

//自定义指令
Vue.directive('display-key', {
    bind(el, binding) {
        console.log('自定义指令值绑定==', binding);
    },
    inserted(el, binding) {
        console.log('自定义指令传值==', binding);
        let displayKey = binding.value;
        if (displayKey == 11) {
            el.parentNode && el.parentNode.removeChild(el);
        } else {
            //抛出异常
            throw new Error('need key! like v-display-key = Boolean');
        }
    },

    update(el, binding) {
        console.log('自定义指令值更新==', binding);
        let displayKey = binding.value;
        if (displayKey == 11) {
            el.parentNode && el.parentNode.removeChild(el);
        }
        if (displayKey != 11) {
            console.log('updateEl', el);
            console.log('el.parentNode=', el.parentNode);
            el.parentNode && el.parentNode.appenChild(el);
        }
    }
});




if (process.env.NODE_ENV != 'production') {
    console.log(process.env);
}

// 全局路由守卫
// router.beforeEach((to, from, next) => {
    
//     next()
// })


Vue.directive('stat', {
    bind(el, binding) {
      el.addEventListener('click', () => {
        const data = binding.value;
        let prefix = 'store';
        if (OS.isAndroid || OS.isPhone) {
          prefix = 'mall';
        }
        analytics.request({
          ty: `${prefix}_${data.type}`,
          dc: data.desc || ''
        }, 'n');
      }, false);
    }
  });


const analyticsRequest = (to, from) => {
    // 只统计页面跳转数据，不统计当前页 query 不同的数据
    // 所以这里只使用了 path, 如果需要统计 query 的，可以使用 to.fullPath
    if (to.path !== from.path) {
      analytics.request({
        url: `${location.protocol}//${location.host}${to.path}`
      });
    }
  };


 

router.beforeEach((to, from, next) => {
   

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 这里做登录等前置逻辑判断
        // 判断通过之后，再上报数据
        
        analyticsRequest(to, from);
      } else {
        // 不需要判断的，直接上报数据
        analyticsRequest(to, from);
        next();
      }


    document.querySelector('#app').scrollTo(0,0)
    next();

    
    // // 每切换一个页面关闭页面的弹框提示
    // Toast.clear();  

    // // 校验是否微信客户端打开

    // var useragent = navigator.userAgent;
    // if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
    //     console.log(to)
    //     console.log(from)
    //     Toast.fail({
    //         type:'fail',
    //         message:'请用微信客户端访问',
    //         icon:'fail',
    //         duration:0
    //       })
    // }else{
    //     window.document.title=to.meta.title || 'UrbanRevivo'
    //     next();
    // }

});

new Vue({
    store,
    router,
    render: h => h(App),
    data() {
        return {

        };
    },
    created() {
       
    },
    mounted() {
    
    }
}).$mount('#app');
