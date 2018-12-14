<template>
  <section class="container">
    <home-nav />
    <nuxt-child />
  </section>
</template>

<script>
import HomeNav from '../components/home-nav';

export default {
  components: {
    HomeNav
  }
}
</script>

<style>

</style>
