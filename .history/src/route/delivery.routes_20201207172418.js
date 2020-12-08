/*
 * @Description: 待收货页面
 * @Author: lyj
 * @Date: 2020-12-7 17:24:53
 */

export default {
    path: '/category/:index',
    name: 'category',
    component: () => import('../views/category.vue'),
    meta: {
        title: '菜单类别',
        keepAlive: false
    },
 
};
