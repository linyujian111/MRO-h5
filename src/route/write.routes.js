/*
 * @Description: 登入组件
 * @Author: xwq
 * @Date: 2020-03-24 22:27:53
 */

export default {
    path: '/write/:winningId',
    name: 'write',
    component: () => import('../views/write.vue'),
    beforeEnter: (to, from, next) => {
        // console.log(to, from);
        next();
        
    },
    meta: {
        title: '领取奖品',
        keepAlive: false
    }
};
