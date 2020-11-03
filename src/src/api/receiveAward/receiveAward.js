import service from '@/utils/request';
export default {
    receiveAward(params) {
        return service.get('/slsgRequest/mat/getMaterialPage?code=01SJZZZTWL0001&pageNo=1', params);
    }
};
