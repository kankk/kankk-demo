<template>
  <section class="user-id">
    <span>user-name: {{ name }}</span>
  </section>
</template>

<script>
export default {
  name: 'UserId',
  data() {
    return {
      name: ''
    }
  },
  beforeRouteEnter(to , from , next) {
    next(vm => {
      vm.name = to.params.name;
    })
  }
}
</script>

<style>

</style>
