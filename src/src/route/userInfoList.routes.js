/*
 * @Description: 热销商品
 * @Author: xwq
 * @Date: 2020-03-24 22:27:53
 */

export default {
    path: '/userInfoList',
    name: 'userInfoList',
    component: () => import('../views/userInfoList.vue'),
    /* 路由独享守卫 */
    beforeEnter: (to, from, next) => {
        // console.log(to, from);
        next();
    },
    meta: {
        title: '中奖用户信息',
        keepAlive: false
    }
};
