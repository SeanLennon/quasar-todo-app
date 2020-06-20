<template>
  <q-layout>
    <q-header :class="$q.dark.mode ? 'my-black' : 'bg-white'">
      <q-toolbar>
        <q-btn flat round dense icon="arrow_back" color="primary" @click="$router.back()"/>
        <q-space />
        <div>
          <q-btn color="primary" icon="person" flat round dense />
          <q-btn color="primary" icon="more_vert" flat round dense />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',

  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-black {
  background-color: #121212;
}
</style>
