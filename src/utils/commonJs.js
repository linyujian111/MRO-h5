
/**
* @Description: 获取全部地址栏参数
* @Param: 
* @Author: xwq
* @Date: 2019-02-19 09:15:53
* @LastEditors: Please set LastEditors
* @LastEditTime: 2019-05-13 09:38:33
* @return: 
*/
export function getUrlParams() {
    let reg = new RegExp('(^|&)*=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    let query = {};
    if (r) {
        r = unescape(decodeURIComponent(r.input));
        r = r.split('&');
        if (r.length > 0) {
            query = {};
            for (let i = 0; i < r.length; i++) {
                r[i] = r[i].split('=');
                query[r[i][0]] = r[i][1];
            }
        }
    }
    return query;
}
/**
 * @Description: 日期格式_格式化 (YYYY-MM-dd-HH-mm-ss)
 * @Param: 
 * @Author: xwq
 * @LastEditors: xwq
 * @LastEditTime: Do not edit
 * @return: 
 * @Date: 2019-06-12 15:24:23
 */
export function dateTimeFormate(val, timeFormate) {
    let t = new Date(val);
    let tf = function (val) {
        return val > 9 ? val : '0' + val;
    };
    if (val && timeFormate) {
        return timeFormate.replace(/YYYY|MM|dd|HH|mm|ss/g, v => {
            switch (v) {
                case 'YYYY':
                    return t.getFullYear();
                case 'MM':
                    return tf(t.getMonth() + 1);
                case 'dd':
                    return tf(t.getDate());
                case 'HH':
                    return tf(t.getHours());
                case 'mm':
                    return tf(t.getMinutes());
                case 'ss':
                    return tf(t.getSeconds());
                default: break;
            }
        });
    } else {
        // eslint-disable-next-line no-console
        console.log('缺少参数。。。');
    }
}
/**
 * @Description: APP状态判断
 * @Param: 
 * @Author: xwq
 * @LastEditors: xwq
 * @LastEditTime: Do not edit
 * @return: 
 * @Date: 2019-06-21 09:34:46
 */
export function getAppStatus() {
    //ios||android状态判断
    let u = navigator.userAgent;
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isiOS ? 'ios' : 'android';

}

/**
 * @Description: 深复制方法
 * @Param: 
 * @Author: xwq
 * @LastEditors: xwq
 * @LastEditTime: Do not edit
 * @return: 
 * @Date: 2019-06-21 09:36:19
 */
export function deepCopy(val) {
    // val = val ? val : {};
    // let typeResult = Object.prototype.toString.call(val).slice(8, -1);//返回类型-》Object Array ...
    //val instanceof Object  不能对Object类型正确判断，可以判断Array进行取反>>!(val instanceof Array)
    if (typeof val === 'object') {
        let result = JSON.parse(JSON.stringify(val));
        return result;
    } else {
        return val;
    }


}

/**
 * @Description: 浅复制方法
 * @Param: 
 * @Author: xwq
 * @LastEditors: xwq
 * @LastEditTime: Do not edit
 * @return: 
 * @Date: 2019-06-21 09:50:25
 */

export function simpleCopy(val) {
    /*
     Object.assign({}, val)
    当数据只有一层的时候也是深复制
     */
    if (typeof val === 'object') {
        let result = Object.assign({}, val);
        return result;
    } else {
        return val;
    }

}

/**
 * @Description:判断 数组、对象是否为空
 * @Param: Array  Object
 * @Author: xwq
 * @LastEditors: xwq
 * @LastEditTime: Do not edit
 * @return:
 * @Date: 2019-06-26 10:28:00
 */

export function isEmptyObject(obj) {
    let len = Object.keys(obj).length;
    if (len) {
        return false;
    }
    return true;
}

/**
 * @Description: 轮播图动态获取高度
 * @Param: 
 * @Author: xwq
 * @LastEditors: xwq
 * @LastEditTime: Do not edit
 * @return: 
 * @Date: 2019-07-08 16:02:53
 */

export function bannerHeightFormate() {

    let currentHeight = document.documentElement.clientHeight || document.body.clientHeight;
    return Math.ceil(currentHeight * 0.375)
}

/**
 * @Description: 获取可视区域宽度
 * @Param: 
 * @Author: xwq
 * @LastEditors: xwq
 * @LastEditTime: Do not edit
 * @return: 
 * @Date: 2019-07-31 13:52:32
 */
export function getClientWidth() {
    let clientWidth =
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    return parseInt(Math.floor(clientWidth * 0.9));
}

/**
 * @Description: 图片预览_转URL方法
 * @Param: 
 * @Author: xwq
 * @LastEditors: xwq
 * @LastEditTime: Do not edit
 * @return: 
 * @Date: 2019-09-15 21:01:11
 */
export function previewImg(file) {
    if (!file) return;
    return window[window.webkitURL ? 'webkitURL' : 'URL']['createObjectURL'](file);
}

/**
 * @Description: 对象合并
 * @Param: 
 * @Author: xwq
 * @Date: 2019-12-07 17:05:23
 * @LastEditors: xwq
 * @LastEditTime: Do not edit
 * @return: 
 */

export function objectMerge(obj1, obj2) {
    for (let i in obj2) {
        obj1[i] = obj2[i];
    }
    return obj1;
}

