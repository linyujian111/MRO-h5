/*
 * @Description: 待收货页面
 * @Author: lyj
 * @Date: 2020-12-7 17:24:53
 */

export default {
    path: '/delivery',
    name: 'delivery',
    component: () => import('../views/delivery/delivery.vue'),
    meta: {
        title: '待收货页面',
        keepAlive: false,
        requiresAuth: true
    },
 
};
