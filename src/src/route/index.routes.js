/*
 * @Description: 分类组件
 * @Author: xwq
 * @Date: 2020-03-24 22:27:53
 */

export default {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue'),
    meta: {
        title: '首页',
        keepAlive: false
    },
 
};
