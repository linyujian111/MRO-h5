import service from '@/utils/request';
export default {
    getToken(params) {
        return service.post('/weChat/getToken', params);
    }
};
