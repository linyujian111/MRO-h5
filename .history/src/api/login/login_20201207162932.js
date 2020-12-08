import service from '@/utils/request';
export default {
    toLogin(params) {return service.post('/login', params);
    }
};



