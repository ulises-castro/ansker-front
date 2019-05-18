const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']


module.exports = {
  // Check this is insecure
  devServer: {
    port: 1297, // CHANGE YOUR PORT HERE!
    // https: true,
    disableHostCheck: true,
  }
  // mode: 'production'
  // devServer: {
  //   compress: true,
  //   historyApiFallback: true,
  //   hot: true,
  //   open: true,
  //   overlay: true,
  //   port: 8000,
  //   stats: {
  //     normal: true
  //   }
  // }
  // configureWebpack: {
  //   mode: 'production',
  //   plugins: [
  //     new CompressionWebpackPlugin({
  //       filename: '[path].gz[query]',
  //       algorithm: 'gzip',
  //       test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
  //       threshold: 10240,
  //       minRatio: 0.8
  //     })
  //   ]
  // }
}


