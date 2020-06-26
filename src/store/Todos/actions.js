
const addTodo = ({ commit }, todo) => {
  commit('SET_TODO', todo)
}

const addItem = ({ commit }, item) => {
  commit('SET_ITEM', item)
}

const addTodoName = ({ commit }, name) => {
  commit('SET_TODO_NAME', name)
}

export {
  addTodo,
  addItem,
  addTodoName
}
