import service from '@/utils/request';
export default {
    // 获取可抽奖的订单列表
    getOrders(params) {
        return service.post('/lottery/getOrders', params);
    },

    // 提交抽奖订单
    saveLotteryOrder(params) {
        return service.post('/lottery/saveLotteryOrder', params);
    }
};



