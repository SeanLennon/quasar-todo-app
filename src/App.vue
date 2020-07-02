<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  mounted () {
    this.$q.dark.set(true)
  }
}
</script>

<style lang="stylus">
.todo-card {
  border-left: 5px solid #5F5CCE;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
