import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import Todos from 'src/store/Todos/index'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      Todos
    },
    strict: process.env.DEV
  })

  return Store
}
