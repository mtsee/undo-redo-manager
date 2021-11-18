const { resolve, srcPath, version, hash } = require('./config');

// webpack 配置文档
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  resolve: {
    modules: [resolve('../node_modules'), 'node_modules'],
    extensions: ['.js', '.es', '.css', '.less'],
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [srcPath],
        use: ['babel-loader']
      },
      {
        test: /\.(woff|eot|ttf|svg)$/,
        include: srcPath,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10,
              name: `assets/fonts/[name]${hash}.[ext]`
            }
          }
        ]
      },
      {
        // 图片加载处理
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
        include: srcPath,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              name: `assets/images/[name]${hash}.[ext]`
            }
          }
        ]
      }
      // {
      //   test: /\.html$/,
      //   loader: 'html-loader'
      // }
    ]
  },
  plugins: [new CaseSensitivePathsPlugin()]
};
