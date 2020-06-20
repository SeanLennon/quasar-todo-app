<template>
  <q-page padding>
    <div class="row items-start justify-center">
      <div class="column q-gutter-y-sm col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-6">
        <q-input type="textarea" autogrow borderless input-class="text-grey-8 q-px-md q-mb-md text-weight-bold text-h5 row" v-model="todo.name">
          <div class="self-center q-pr-md q-mb-md">
            <q-btn flat round dense icon="check"
              :color="todo.items.filter(x => x.done).length === todo.items.length ? 'primary' : 'grey'"
              @click="todo.items.forEach(x => x.done = true)"
            ></q-btn>
          </div>
        </q-input>
        <!-- <q-item-label header class="text-weight-bold text-h5 row">
          {{ todo.name }}
          <q-space />
          <q-btn flat round dense color="primary" icon="check" @click="todo.items.forEach(x => x.done = true)"></q-btn>
        </q-item-label> -->
        <q-card class="todo-card" v-for="(item, index) in todo.items" :key="index">
          <q-card-section horizontal class="items-start">
            <q-card-section>
              <q-checkbox v-model="item.done" />
            </q-card-section>

            <q-card-section
              class="q-px-none text-weight-bold fit self-center"
              :class="{ 'text-strike text-grey': item.done }"
              @click="item.done = !item.done"
            >
              {{ item.name }}
            </q-card-section>

            <q-card-section>
              <q-card-section horizontal>
                <q-btn color="primary" icon="edit" flat round />
                <q-btn color="primary" icon="star_outline" flat round/>
              </q-card-section>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  props: ['id'],

  data () {
    return {
      todo: {}
    }
  },

  methods: {
    async getTodoApi () {
      const { data } = await this.$axios({
        url: 'https://localhost:5001/todos/' + this.id,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-version': 1.0
        }
      })
      if (data) {
        this.todo = data
      }
    }
  },

  created () {
    this.getTodoApi()
  }
}
</script>
