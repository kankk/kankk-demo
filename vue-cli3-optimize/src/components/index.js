import Vue from 'vue'

// 自动加载global目录下的.js后缀的文件
const componentsContext = require.context('./global', true, /\.js$/)

componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component)
  // 兼容import export和require module.export两种规范
  const ctrl = componentConfig.default || componentConfig
  Vue.component(ctrl.name, ctrl)
})
