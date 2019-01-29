<template>
  <button @click="$emit('click')">
    <template v-if="text">{{ text || 'Button' }}</template>
    <template v-else>
      <slot></slot>
    </template>
  </button>
</template>

<script>
export default {
  name: 'mk-button',
  props: {
    text: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
