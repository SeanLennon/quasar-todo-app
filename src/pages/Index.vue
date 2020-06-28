<template>
  <q-page padding>
    <div class="row items-start justify-center">
      <div v-if="todos.length > 0" class="column q-gutter-y-md col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-6">
        <q-item-label header class="text-weight-bold text-h5">TODOS</q-item-label>
        <q-card class="todo-card" @click="() => $router.push({ path: '/todo/' + item.id })" v-for="(item, index) in todos" :key="index">
          <!-- <q-card-section horizontal>
            <q-card-section class="fit text-weight-bold" :class="{ 'text-grey text-strike': item.done}">
              {{ item.name }}
            </q-card-section>
            <q-card-section class="text-weight-bold text-primary">
              {{ item.quantity }}
            </q-card-section>
          </q-card-section> -->
          <q-slide-item @right="onRight" left-color="red" right-color="red" class="rounded-borders">
            <template v-slot:right>
              <q-btn flat rounded icon-right="delete" label="Apagar" @click="handlerDeleteTodoAsync(item.id)" />
            </template>
            <q-item class="rounded-borders">
              <q-item-section :class="{ 'text-strike text-grey': item.done }">
                {{ item.name }}
              </q-item-section>
              <q-item-section side>
                <q-card-section class="text-weight-bold text-primary">
                  {{ item.quantity }}
                </q-card-section>
              </q-item-section>
            </q-item>
          </q-slide-item>
        </q-card>
      </div>

      <div v-else class="column q-gutter-y-sm col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-6">
        <q-item-label header class="text-weight-bold text-h5">TODOS</q-item-label>
        <q-card class="todo-card" v-for="item in 8" :key="item">
          <q-skeleton height="50px"></q-skeleton>
        </q-card>
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="edit" color="primary" @click="() => $router.push({ path: '/todo/00000000-0000-0000-0000-000000000000' })" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { GetAllAsync, DeleteAsync } from '../controllers/TodoController'

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
    },

    async handlerDeleteTodoAsync (id) {
      const status = await DeleteAsync(id)
      if (status === 200) {
        this.$router.push('/')
      }
    },

    onRight ({ reset }) {
      this.finalize(reset)
    },

    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 2000)
    }
  },

  created () {
    this.getTodosApi()
  },

  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>
