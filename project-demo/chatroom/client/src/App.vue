<template>
  <div id="app">
    <span v-on:click="loadbyfetch">click to load</span>
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
    loadbyfetch: function(event) {
      fetch('/api/chatroom').then(function (response) {
        response.json().then(data => {
          console.log(data);
        })
      })
    }
  },
}
</script>

<style>

</style>
