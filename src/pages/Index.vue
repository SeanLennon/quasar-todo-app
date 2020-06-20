<template>
  <q-page padding>
    <div class="row items-start justify-center">
      <div class="column q-gutter-y-sm col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-6">
        <q-item-label header class="text-weight-bold text-h5">TODOS</q-item-label>
        <q-card class="todo-card" @click="$router.push({ path: '/todo/' + item.id })" v-for="(item, index) in todos" :key="index">
          <q-card-section horizontal>
            <q-card-section class="fit text-weight-bold" :class="{ 'text-grey text-strike': item.done}">
              {{ item.name }}
            </q-card-section>
            <q-card-section class="text-weight-bold text-primary">
              {{ item.quantity }}
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',

  data () {
    return {
      todos: []
    }
  },

  methods: {
    async getTodosApi () {
      const { data } = await this.$axios({
        url: 'https:localhost:5001/todos',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-version': 1.0
        }
      })
      this.todos.push(...data)
    }
  },

  created () {
    this.getTodosApi()
  }
}
</script>
