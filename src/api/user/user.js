import service from '@/utils/request';
export default {
    getUserInfo(params){
        return service.post('/user/getUserInfo', params);
    }
};
