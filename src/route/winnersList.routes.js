/*
 * @Description: 热销商品
 * @Author: xwq
 * @Date: 2020-03-24 22:27:53
 */

export default {
    path: '/winnersList',
    name: 'winnersList',
    component: () => import('../views/winnersList.vue'),
    /* 路由独享守卫 */
  
    meta: {
        title: '往期中奖名单',
        keepAlive: false
    }
};
