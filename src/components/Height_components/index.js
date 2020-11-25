/*
 * @Description: 全局注入高频组件
 * @Author: xwq
 * @Date: 2020-03-27 14:07:59
 */
function changeStr(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const requireComponent = require.context('./', false, /\.vue$/);

const install = (vue) => {
    requireComponent.keys().forEach(fileName => {
        let config = requireComponent(fileName);

        let componentName = changeStr(
            fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
        );

        console.log('componentName==', componentName);

        vue.component(componentName, config.default || config);

    });
};

export default {
    install
};


