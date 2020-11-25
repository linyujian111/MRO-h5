import { Toast } from 'vant';
/**
 * @Description: 调起原生API获取当前位置信息
 * @Param: 
 * @Author: xwq
 * @LastEditors: xwq
 * @LastEditTime: Do not edit
 * @return: 
 * @Date: 2019-07-20 09:37:09
 */
// 扩展API加载完毕后调用onPlusReady回调函数 
export function getCurrentPosition() {
    if (window.plus) {
        let resultInfo = null;
        plus.geolocation.getCurrentPosition(function (p) {
            /*  Toast({
                 type: 'success',
                 message: JSON.stringify(p),
                 duration: 3000,
             }); */
            resultInfo = JSON.stringify(p);
            return resultInfo;
        }, function (e) {
            Toast({
                type: 'fail',
                message: 'Geolocation error: ' + e.message,
                duration: 0,
            });
        }, { provider: "amap", geocode: true });

    }
}
