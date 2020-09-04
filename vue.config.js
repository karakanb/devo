module.exports = {
  filenameHashing: false,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/proxy': {
        target: 'https://lobste.rs/',
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': '',
        },
      },
    },
  },
};
