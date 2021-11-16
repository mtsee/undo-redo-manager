const { resolve, srcPath, version, hash, distPath } = require('./config');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const LessPluginFunctions = require('less-plugin-functions');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = merge(baseConfig, {
  devtool: false,
  entry: {
    main: resolve('../src/index.js') // 主网站入口
    // common: [] // 打包公共资源
  },
  output: {
    publicPath: './',
    path: distPath,
    filename: `assets/js/[name].${version}.${hash}.js`
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        include: [srcPath, resolve('../node_modules')],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
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
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false, // 去除warning警告
            // drop_debugger: true,// 发布时去除debugger语句
            // drop_console: true, // 发布时去除console语句
            pure_funcs: ['console.log'] // 配置发布时，不被打包的函数，只去掉console.log
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        // 出现多次的js包单独打包成common.js
        commons: {
          name: 'common',
          priority: 10, // 优先级
          // test: /react|mobx|antd|moment/,
          test: /node_modules/,
          chunks: 'initial',
          // minSize: 0, // 默认小于30kb不会打包
          minChunks: 2 // 引用1次就要打包出来
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `assets/css/[name].${version}${hash}.css`
    }),
    new CleanWebpackPlugin({
      root: __dirname.replace('scripts', 'dist')
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [{ source: resolve('../public/assets'), destination: resolve('../dist/assets') }]
        }
      }
    })
  ]
});
