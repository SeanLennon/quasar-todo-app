
const SET_TODO = (state, payload) => {
  state.todo = payload
}

const SET_ITEM = (state, payload) => {
  state.todo.items.push(payload)
}

const SET_TODO_ITEM = (state, payload) => {
  state.todo.name = payload
}

export {
  SET_TODO,
  SET_ITEM,
  SET_TODO_ITEM
}
