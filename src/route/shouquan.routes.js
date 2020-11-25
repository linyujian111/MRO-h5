/*
 * @Description: 登入组件
 * @Author: xwq
 * @Date: 2020-03-24 22:27:53
 */

export default {
    path: '/shouquan',
    name: 'shouquan',
    component: () => import('../views/shouquan.vue'),
    meta: {
        title: 'UrbanRevivo',
        keepAlive: false
    }
};
