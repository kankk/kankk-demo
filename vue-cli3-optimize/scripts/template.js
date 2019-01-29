module.exports = {
  vueTemplate: componentName => {
    return `<template>
    <div class="${componentName}">
      ${componentName}组件
    </div>
    </template>
    <script>
    export default {
      name: '${componentName}'
    }
    </script>
    <style lang="scss" scoped>
    .${componentName} {

    }
    </style>
    `
  },
  entryTemplate: `import Index from './index.vue'
  export default Index`
}