/*
 * @Description: 路由文件
 * @Author: xwq
 * @Date: 2019-08-21 14:57:26
 */
import Vue from 'vue';
import vueRouter from 'vue-router';
Vue.use(vueRouter);

const routerList = [];
function getRouterAll(r) {
    console.log('r==', r);
    r.keys().forEach(
        key => routerList.push(r(key).default)
    );
}
getRouterAll(require.context('../route', true, /\.routes\.js/));

console.log('routerList==', routerList);

const router = [
    {
        path: '/',
        redirect: { name: 'index' }
    },
    ...routerList,
    {
        path:'*',
        name: 'NotFound',
        component: () => import('../views/noFound.vue'),
        meta: {
            title: '404页面',
            keepAlive: false
        },
        beforeEnter: (to, from, next) => {
            if(!window.localStorage.getItem('WXtoken')){
                window.localStorage.setItem('WXtoken','null')
            }
            next();
        },
    }
];




    
export default new vueRouter({
    routes: router,
});