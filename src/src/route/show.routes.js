/*
 * @Description: 登入组件
 * @Author: xwq
 * @Date: 2020-03-24 22:27:53
 */

export default {
    path: '/show/:yearMonth',
    name: 'show',
    component: () => import('../views/show.vue'),
    meta: {
        title: '',
        keepAlive: false
    }
};
