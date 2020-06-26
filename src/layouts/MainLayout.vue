<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="$q.dark.mode ? 'my-black' : 'bg-white'">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          color="primary"
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-space />
        <div>
          <q-btn flat icon="brightness_medium" color="primary" dense round @click="$q.dark.toggle()"></q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :content-class="$q.dark.mode ? 'bg-dark' : 'bg-grey-3'"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
          <q-item clickable to="/todo/1">
            <q-item-section avatar>
              <q-icon name="note" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Todo</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/todos/users">
            <q-item-section avatar>
              <q-icon name="note" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Todos of friends</q-item-label>
            </q-item-section>
          </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-black {
  background-color: #121212;
}
</style>
