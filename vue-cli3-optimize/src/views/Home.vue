<template>
  <div class="home">
    <mk-button @click="handleMkButtonClick">mk-button</mk-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    handleMkButtonClick () {
      console.log('mk-button click')
    }
  }
}
</script>
