/*
 * @Description: 登入组件
 * @Author: xwq
 * @Date: 2020-03-24 22:27:53
 */

export default {
    path: '/sended',
    name: 'sended',
    component: () => import('../views/sended.vue'),
    meta: {
        title: 'UrbanRevivo',
        keepAlive: false
    },
 
};
