
const getTodo = (state) => state.todo
const getItems = (state) => state.todo.items
const getTodoName = (state) => state.todo.name

export {
  getTodo,
  getItems,
  getTodoName
}
