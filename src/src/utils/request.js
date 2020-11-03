/*
 * @Description: 请求配置
 * @Author: xwq
 * @Date: 2019-03-30 17:30:34
 * @LastEditTime: 2019-08-22 15:35:39
 */
import $http from 'axios';
import Qs from 'qs';
import { Toast } from 'vant';

// process.env.VUE_APP_API_URL

const service = $http.create({

    // baseURL: process.env.VUE_APP_API_URL,
    timeout: 5000,
    'Content-type': 'application/json',

    // transformRequest: [function (data) {
    //     // Do whatever you want to transform the data
    //     data = Qs.stringify(data);
    //     return data;
    // }],
});
// headers: { 'X-Custom-Header': 'foobar' },

const responseCode = {
    
    '0004': function (msg) {
        Toast.clear()
        Toast.fail({
            message: msg,
            forbidClick: true,
            loadingType: "fail",
          });
    },
    '101': function (msg) {
        Toast.clear()
        Toast.fail({
            message: msg,
            forbidClick: true,
            loadingType: "fail",
          });
    },
    '001': function (msg) {
        Toast.clear()
        Toast.fail({
            message: msg,
            forbidClick: true,
            loadingType: "fail",
          });
    }
   
   

    // '40029': function (msg) {
    //     Toast.fail(msg);
    // },
};


//interceptors.request
//请求拦截
service.interceptors.request.use(config => {

    config.headers['Content-Type'] = 'application/json'

    let WXtoken = window.localStorage.getItem('WXtoken')

    let isAddToken = window.localStorage.getItem('isAddToken')

    if (isAddToken == 'true') {
        if (WXtoken) {
            config.headers['Authorization'] = `${WXtoken}` || '';
        } else {
            config.headers['Authorization'] = '';
        }
    } else {
        config.headers['Authorization'] = '';
    }


    
    // eslint-disable-next-line no-console
    // console.log(config, '---------');
    // if (!config.data) {
    //     config.data = {};
    // }
    // config.data.token = '44646116f161689441616161';


    return config;
}, error => {

    return Promise.rejiect(error);
});

//interceptors.response
//响应拦截
service.interceptors.response.use(res => {
    // console.log(res.data.code)
    // if(res.data.code!=200){
    //     Toast.fail('系统异常')
    // }else{
    //     return res
    // }
    Toast.clear();

    console.log('拦截器成功')
    console.log(res)

    const response = res.data;
    if (response.code != 200) {

        if (responseCode[response.code]) {
            responseCode[response.code](response.desc);
            // Toast.fail(response.desc)
        }
        return Promise.reject(response).catch(erro => {
            // Toast.fail(erro.desc)
            return erro;
        });
    } else {
        return response;
    }

}, error => {


    return Promise.reject(error).catch(errorInfo => {

        console.log('拦截器错误')

        console.log(errorInfo)

        Toast.clear();

        var originalRequest = error.config;
        if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1 && !originalRequest._retry) {

            Toast.fail('该请求已超时,请重新操作')
            return errorInfo;
        }

        return errorInfo;
    });
});



export default service;