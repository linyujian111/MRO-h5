/*
 * @Description: 分类组件
 * @Author: xwq
 * @Date: 2020-03-24 22:27:53
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
