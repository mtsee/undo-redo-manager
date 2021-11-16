const { resolve, srcPath, devServer, version, hash } = require('./config');

const baseConfig = require('./webpack.config.base');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const LessPluginFunctions = require('less-plugin-functions');

module.exports = merge(baseConfig, {
  entry: [
    'webpack-dev-server/client?http://' + devServer.host + ':' + devServer.port, //  为webpack-dev-server的环境打包好运行代码
    'webpack/hot/only-dev-server', // 为热替换（HMR）打包好运行代码,//  only- 意味着只有成功更新运行代码才会执行热替换（HMR）
    resolve('../src/index.js')
  ],
  output: {
    publicPath: '/',
    path: resolve('../public'),
    filename: `assets/js/[name].${version}.${hash}.js`
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        include: [srcPath, resolve('../node_modules')],
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                plugins: [new LessPluginFunctions()]
              }
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [new webpack.NoEmitOnErrorsPlugin(), new webpack.HotModuleReplacementPlugin()],
  devServer
});
