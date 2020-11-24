/*
 * @Description: Hbuilder打包  解决物理键返回退出app的解决方法
 * @Author: xwq
 * @Date: 2019-07-17 14:50:23
 */
import { Toast } from 'vant';
document.addEventListener('plusready', function () {
    let webview = plus.webview.currentWebview();
    plus.key.addEventListener('backbutton', function () {
        webview.canBack(function (e) {
            if (e.canBack) {
                webview.back();
            } else {
                // webview.close() //hide,quit
                // plus.runtime.quit()
                // 首页返回键处理
                // 处理逻辑：1秒内，连续两次按返回键，则退出应用；
                let first = null;
                plus.key.addEventListener(
                    'backbutton',
                    function () {
                        // 首次按键，提示‘再按一次退出应用’
                        if (!first) {
                            first = new Date().getTime()
                            // console.log('再按一次退出应用') // 此处可以用自定义提示
                            Toast({
                                type: 'fail',
                                message: '连续按两次，即可退出APP应用',
                                duration: 1000,
                            });
                            setTimeout(function () {
                                first = null;
                            }, 1000);
                        } else {
                            if (new Date().getTime() - first < 1500) {
                                plus.runtime.quit();
                            }
                        }
                    },
                    false
                );
            }
        });
    });
});