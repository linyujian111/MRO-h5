import service from '@/utils/request';
export default {
    // 获取菜单列表
    getMenuList(params) {
        return service.post('/mat/Material/search', params);
    }
};



