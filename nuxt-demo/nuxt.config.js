const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    // 为客户端和服务端的构建配置进行手工的扩展处理。
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',  // loaders选项
          exclude: /(node_modules)/
        })
      }
    },
    // 使用webpack-bundle-analyzer分析并可视化构建后的打包文件, (Boolean/Object)
    analyze: true,
    // 为JS和Vue文件设定自定义的babel设置
    // babel: {
    //   presets: ['es2015', 'stage-0']
    // },
    // 启用 uglifyjs-webpack-plugin 和 cache-loader 的缓存
    cache: false,
    // 开启 CSS Source Map 支持
    // cssSourceMap: true, // development
    // cssSourceMap: false, // production
  }
}
