/*
 * @Description: 登入组件
 * @Author: xwq
 * @Date: 2020-03-24 22:27:53
 */

export default {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue'),
    redirect: { name: 'index' },
    children: [{
        path: '/pending',
        name: 'pending',
        component: () => import('../views/pending.vue'),
        meta: {
            title: '我的待办',
            keepAlive: false
        },
    },{
        path: '/index',
        name: 'index',
        component: () => import('../views/index.vue'),
        meta: {
            title: '',
            keepAlive: false
        },
    }],
    meta: {
        title: 'MRO首页',
        keepAlive: true
    },


};
