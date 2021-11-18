const { resolve, srcPath } = require('./config');
// webpack 配置文档
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const LessPluginFunctions = require('less-plugin-functions');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const pluginConf = {
  mode: 'production',
  // mode: 'development',
  entry: {
    index: resolve('../src/UndoRedoManager.js') // 插件入口
  },
  output: {
    publicPath: '/',
    path: resolve('../umd'),
    filename: `index.js`,
    libraryTarget: 'umd'
  },
  externals: {},
  resolve: {
    extensions: ['.js', '.jsx', '.esm', '.css', '.less'],
    alias: {}
  },
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
      filename: `style.css`
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            { source: resolve('../package_umd.json'), destination: resolve('../umd/package.json') },
            { source: resolve('../README.md'), destination: resolve('../umd/README.md') }
          ]
        }
      }
    }),
    new CleanWebpackPlugin({
      root: __dirname.replace('scripts', 'umd')
    })
  ]
};

module.exports = merge(baseConfig, pluginConf);
