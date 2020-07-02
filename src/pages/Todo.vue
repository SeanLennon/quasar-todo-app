<template>
    <q-layout view="lHh Lpr lFf">
      <q-header :class="$q.dark.mode ? 'my-black' : 'bg-white'">
        <q-toolbar>
          <q-btn flat round dense icon="arrow_back" color="primary" @click="$router.back()"
            v-if="$q.platform.is.mobile || $router.name === '/'"
          />
          <q-btn v-else flat dense round
            color="primary"
            icon="menu"
            aria-label="Menu"
            @click="leftDrawer = !leftDrawer"
          />
          <q-space />
          <div class="row q-gutter-x-xs">
            <q-btn color="primary" dense flat rounded no-caps label="Salvar" class="q-px-sm"
              @click="handlerUpdate" v-if="todo.id"
            />
            <q-btn color="primary" dense flat rounded no-caps label="Salvar" class="q-px-sm"
              @click="handlerSave" v-else
            />
            <q-btn icon="person" flat dense round color="primary" />
            <q-btn color="negative" icon="delete" flat round dense
              @click.prevent="handlerDelete(id)"
            />
            <q-btn color="primary" icon="more_vert" flat round dense />
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawer"
        show-if-above
        :content-class="$q.dark.mode ? 'bg-dark' : 'bg-grey-3'"
      >
        <q-list>
          <div class="row justify-between q-pr-sm items-center">
            <q-item-label
              header
              class="text-grey-8"
            >
              Essential Links
            </q-item-label>
            <div>
              <q-btn flat icon="brightness_medium" color="primary" dense round @click="$q.dark.toggle()" />
            </div>
          </div>
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

      <q-footer class="q-pa-sm" :class="$q.dark.mode ? 'bg-dark' : 'bg-grey-4'">
        <div class="row q-gutter-x-sm justify-between items-center">
          <q-input placeholder="Digite um nome..." dense :dark="false" class="col" borderless :bg-color="$q.dark.mode ? 'grey-10' : 'grey-2'"
            :input-class="$q.dark.mode ? 'rounded-borders text-white q-px-sm overflow-hidden' : 'rounded-borders text-dark text-weight-medium q-px-sm overflow-hidden'" type="textarea" autogrow
            v-model="name"
            @keypress.enter.prevent="handlerInsertItem(name)"
          />
          <div class="self-end q-mb-xs">
            <q-btn icon="send" dense round flat color="primary"
              @click.prevent="handlerInsertItem(name)"
            />
          </div>
        </div>
      </q-footer>

      <q-page-container>
        <q-page padding>
          <div class="row items-start justify-center">
            <div class="column q-gutter-y-md col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-6">
              <q-item class="q-pb-none">
                <q-item-section>
                  <q-input placeholder="Digite um nome..." borderless type="textarea" autogrow v-model="todo.name"
                    input-class="text-grey-8 text-weight-bold text-h5 row overflow-hidden"
                  />
                </q-item-section>
                <q-item-section side class="self-start q-mt-sm">
                  <q-btn flat round dense icon="check"
                    :color="allDone()"
                    @click="handlerChangeAllDone()"
                  />
                </q-item-section>
              </q-item>

              <q-card class="todo-card rounded-borders" v-for="(item, index) in todo.items" :key="index" v-show="!item.toDelete">
                <q-slide-item @left="onLeft" @right="onRight" left-color="red" right-color="red" class="rounded-borders"
                  v-if="$q.platform.is.mobile"
                >
                  <template v-slot:left>
                    <q-btn flat rounded icon="delete" label="Apagar" @click="handlerDeleteItem(item)" />
                  </template>
                  <template v-slot:right>
                    <q-btn flat rounded icon-right="delete" label="Apagar" @click="handlerDeleteItem(item)" />
                  </template>
                    <q-item class="rounded-borders">
                      <q-item-section avatar class="self-start">
                        <q-checkbox v-model="item.done" />
                      </q-item-section>
                      <q-item-section :class="{ 'text-strike text-grey': item.done }" @click.prevent="item.done = !item.done">
                        {{ item.name }}
                      </q-item-section>
                      <q-item-section side class="self-start">
                        <q-card-section horizontal>
                          <q-btn color="primary" flat round icon="edit" @click="handlerEditItem(item)" />
                        </q-card-section>
                      </q-item-section>
                    </q-item>
                </q-slide-item>

                <q-item v-else class="rounded-borders">
                  <q-item-section avatar class="self-start">
                    <q-checkbox v-model="item.done" />
                  </q-item-section>
                  <q-item-section :class="{ 'text-strike text-grey': item.done }" @click.prevent="item.done = !item.done">
                    {{ item.name }}
                  </q-item-section>
                  <q-item-section side class="self-start">
                    <q-card-section horizontal>
                      <q-btn color="primary" flat round icon="edit" @click="handlerEditItem(item)" />
                      <q-btn color="negative" flat round icon="delete" @click="handlerDeleteItem(item)" />
                    </q-card-section>
                  </q-item-section>
                </q-item>
              </q-card>
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
</template>

<script>
import Textarea from '../components/Todos/Textarea.vue'

// eslint-disable-next-line no-unused-vars
import { InsertLocalAsync, GetTodoLocalByIdAsync, RemoveTodoAsync, UpdateTodoAsync } from '../services/TodoService'

// eslint-disable-next-line no-unused-vars
import { GetByIdAsync, CreateAsync } from '../controllers/TodoController'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      name: '',
      todo: {},
      prompt: false,
      leftDrawer: false
    }
  },

  methods: {
    async getTodoApi () {
      // const data = await GetByIdAsync(this.id)
      this.todo = await GetByIdAsync(this.id)
      // this.todo = LocalService.GetTodoById(this.id)
    },

    async handlerInsertItem (name) {
      if (name.trim() === '' || name === null || name === 'undefined') return
      await this.todo.items.unshift({
        name,
        done: false
      })
      this.name = ''
    },

    async handlerEditItem (item) {
      await this.$q.dialog({
        parent: this,
        color: 'primary',
        item: item,
        component: Textarea
      }).onOk(data => {
        item = data
      }).onCancel(() => {})
    },

    async handlerDeleteItem (item) {
      if (item.id) {
        await this.$set(item, 'toDelete', true)
      } else {
        const index = this.todo.items.indexOf(item)
        await this.todo.items.splice(index, 1)
      }
    },

    async handlerSave () {
      if (this.todo.name === '' || this.todo.name === null || this.todo.name === 'undefined') {
        this.$q.notify({
          message: 'Dê um nome para sua lista',
          color: 'negative',
          position: 'top',
          timeout: 700
        })
        return
      }
      await InsertLocalAsync(this.todo)
      this.$router.push({ path: '/' })
    },

    async handlerUpdate () {
      await UpdateTodoAsync(this.todo)
      this.$router.push({ path: '/' })
    },

    async handlerDelete (id) {
      this.$q.dialog({
        dark: this.$q.dark.mode,
        title: this.todo.name,
        ok: 'Apagar',
        message: 'Deseja realmente apagar essa lista?',
        color: 'primar',
        cancel: 'Cancelar'
      }).onOk(async () => {
        await RemoveTodoAsync(id)
        this.$router.push({ path: '/' })
      })
    },

    async handlerChangeAllDone () {
      const dones = await this.todo.items.filter(x => x.done).length
      const length = await this.todo.items.length
      if (dones === length) {
        await this.todo.items.forEach(x => {
          x.done = false
        })
      } else {
        await this.todo.items.forEach(x => {
          x.done = true
        })
      }
    },

    allDone () {
      if (this.todo.items?.length === 0) return 'grey'
      else return this.todo.items?.filter(x => x.done).length === this.todo.items?.length ? 'primary' : 'grey'
    },

    onLeft ({ reset }) {
      this.finalize(reset)
    },

    onRight ({ reset }) {
      this.finalize(reset)
    },

    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 1000)
    }
  },

  created () {
    this.getTodoApi()
  },

  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="stylus" scoped>
  .my-black {
    background-color: #121212;
  }
</style>
