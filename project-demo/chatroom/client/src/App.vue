<template>
  <div id="app">
    <span v-on:click="loadbyaxios">click to load</span>
  </div>
</template>

<script>

export default {
  name: 'app',
  data: function() {
    return {

    }
  },
  methods: {
    loadbyaxios: function(event) {
      axios.get('/chatroom')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
}
</script>

<style>

</style>
