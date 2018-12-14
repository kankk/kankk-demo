<template>
  <div class="error">
    <nuxt-link to="/">首 页</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String | Object | Array,
      default: () => {}
    }
  },
  layout: '404' // 你可以为错误页面指定自定义的布局
}
</script>