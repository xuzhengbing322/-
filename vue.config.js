const path = require('path');
module.exports = {
  // less
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 存放less变量文件的路径
        path.resolve(__dirname, "./src/assets/less/parameter.less")
      ]
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#ec6800'
          },
          javascriptEnabled: true,
        },
      },
    },
  },

  // 关闭eslint
  lintOnSave: false,
  // 配置代理跨域
  devServer: {
    proxy: {
      "/api": {
        target:'http://gmall-h5-api.atguigu.cn',
      },
    },
  },
}