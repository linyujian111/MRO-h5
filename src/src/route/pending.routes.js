/*
 * @Description: 登入组件
 * @Author: xwq
 * @Date: 2020-03-24 22:27:53
 */

export default {
    path: '/pending',
    name: 'pending',
    component: () => import('../views/pending.vue'),
    meta: {
        title: '我的待办',
        keepAlive: false
    },
 
};
