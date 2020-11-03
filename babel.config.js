// transform-remove-console 去除console.log 
let plugins = [
    ['import', {
        'libraryName': 'vant',
        'libraryDirectory': 'es',
        'style': true
    }],
    // 'transform-remove-console',
];
if (process.env.NODE_ENV === 'production') {
    plugins.push('transform-remove-console');  //生产环境移除log内容
}
module.exports = {
    presets: [
        ['@vue/app', {
            'useBuiltIns': 'entry',
        }]
    ],
    plugins: plugins
};