<template>
  <q-page padding>
    <div class="row items-start justify-center">
      <div class="column q-gutter-y-sm col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-6">
        <q-item-label header class="text-weight-bold text-h5">TODOS</q-item-label>
        <q-card class="todo-card" @click="() => $router.push({ path: '/todo/' + item.id })" v-for="(item, index) in todos" :key="index">
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
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="edit" color="primary" @click="() => $router.push({ path: '/todo/00000000-0000-0000-0000-000000000000' })" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { GetAllAsync } from '../controllers/TodoController'

export default {
  name: 'PageIndex',

  data () {
    return {
      todos: []
    }
  },

  methods: {
    async getTodosApi () {
      const data = await GetAllAsync()
      this.todos.push(...data)
    }
  },

  created () {
    this.getTodosApi()
  }
}
</script>
