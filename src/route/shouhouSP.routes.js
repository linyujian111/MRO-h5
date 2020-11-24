/*
 * @Description: 登入组件
 * @Author: xwq
 * @Date: 2020-03-24 22:27:53
 */

export default {
    path: '/shouhouSP/:id',
    name: 'shouhouSP',
    component: () => import('../views/shouhouSP.vue'),
    meta: {
        title: '售后审批',
        keepAlive: false
    },
 
};
