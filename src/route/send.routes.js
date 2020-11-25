/*
 * @Description: 登入组件
 * @Author: xwq
 * @Date: 2020-03-24 22:27:53
 */

export default {
    path: '/send',
    name: 'send',
    component: () => import('../views/send.vue'),
    meta: {
        title: 'UrbanRevivo',
        keepAlive: false
    },
 
};
