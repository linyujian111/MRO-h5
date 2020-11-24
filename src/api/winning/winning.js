import service from '@/utils/request';
export default {

    // 查询中奖地址
    getWinningAddress(params) {
        return service.post('/winning/getWinningAddress', params);
    },

    // 返回期数
    getYearMonth(params){
        return service.post('/winning/getYearMonth', params);
    },


    // 根据期数和订单号擦洗该用户的中奖list
    listWinningInfo(params) {
        return service.post('/winning/listWinningInfo', params);
    },


    // 用户提交中奖地址
    saveWinningAddressInfo(params){
        return service.post('/winning/saveWinningAddressInfo', params);
    }
};
