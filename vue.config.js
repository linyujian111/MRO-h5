const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const isDev = process.env.NODE_ENV === 'development';


//配饰多页应用  （单页应用，这项配置是默认）
const pages = {
    index: {
        // page 的入口
        entry: 'src/main.js',
        // 模板来源
        template: 'public/index.html',
        // 在 dist/index.html 的输出
        filename: 'index.html',
        // 当使用 title 选项时，
        // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'Index Page',
        // 在这个页面中包含的块，默认情况下会包含
        // 提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
};

module.exports = {
    publicPath: './',
    pages: pages,
    devServer: {
        port:8080,
        // disableHostCheck:true,
        // open:true,
        proxy: process.env.VUE_APP_API_URL 

       
    },
    lintOnSave: false,
    css: {
        // 是否使用css分离插件 ExtractTextPlugin Default: 生产环境下是 true，开发环境下是 false
        // extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // 启用 CSS modules for all css / pre-processor files.
        modules: false,
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 37.5, // 换算的基数
                        propList: ['*'],
                        /* 这是解决使用van-circle组件出现的Bug,详情见》》https://github.com/youzan/vant/issues/1948 */
                        selectorBlackList: ["van-circle__layer"]
                    }),
                    require('autoprefixer')({ broswer: 'last 5 versions' }) //CSS3前缀添加
                ]
            },
            less: {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader',
                }]
            }
        }
    },

    //修改基本配置
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));

        // 添加别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@css', resolve('src/assets/css'))
            .set('@image', resolve('src/assets/image'));

        // console.log(config);
        /* 解决webpack资源入口点限制的警告 */
        config.performance.hints(false);

    },

    //生产环境开启插件
    configureWebpack: config => {
        if (!isDev) {
            const plugins = [];
            plugins.push(
                new CompressionWebpackPlugin({   //添加压缩插件
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240, //条件
                    minRatio: 0.8
                })
            );
            config.plugins = [...config.plugins, ...plugins];
        }
    },

};

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, '@/assets/less/style.less'),
                path.resolve(__dirname, '@/assets/less/theme-colors-default.less')
            ],
        });
}