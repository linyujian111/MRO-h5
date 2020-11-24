/*
 * @Description: 登入组件
 * @Author: xwq
 * @Date: 2020-03-24 22:27:53
 */

export default {
    path: '/search',
    name: 'search',
    component: () => import('../views/search.vue'),
    meta: {
        title: '搜索页面',
        keepAlive: false
    },
 
};
