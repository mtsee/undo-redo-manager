const path = require('path');
const resolve = url => path.resolve(__dirname, url);
const internalIp = require('internal-ip');

console.log(internalIp);

module.exports = {
  resolve,
  distPath: resolve('../dist'),
  srcPath: resolve('../src'),
  version: '1.0.0',
  hash: '.[hash:8]', // 是否开启hash配置
  devServer: {
    host: '127.0.0.1', // internalIp.v4.sync(),
    port: 9900,
    inline: true,
    hot: true,
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true, // using html5 router.
    contentBase: resolve('../public'),
    proxy: {
      '/api': {
        target: 'https://www.h5ds.com',
        changeOrigin: true
      }
    }
  }
};
