import { LocalStorage as store, uid } from 'quasar'
import Axios from 'axios'

const ApiUrlBase = process.env.DEV ? 'https://localhost:5001' : 'https://api-todo-app.herokuapp.com'

const client = Axios.create({
  baseURL: ApiUrlBase,
  headers: {
    'Content-Type': 'application/json',
    'X-version': 1.0
  }
})

function CreateTodo (todo) {
  return {
    id: uid(),
    name: todo.name,
    done: todo.items.filter(x => x.done).length === todo.items.length ?? false,
    createdAt: new Date(),
    items: todo.items.map(x => {
      return {
        id: uid(),
        name: x.name,
        done: x.done,
        createdAt: new Date()
      }
    })
  }
}

function UpdateTodo (x, todo) {
  if (x.id === todo.id) {
    x.name = todo.name
    x.done = todo.items?.filter(x => x.done).length === todo.items.length ?? false
    x.items = [...todo.items]
  }
}

const InsertLocalAsync = async (todo) => {
  const todos = await GetTodosLocalAsync()
  const result = CreateTodo(todo)
  await todos.unshift(result)
  store.set('todos', todos)
}

const InsertApiAsync = async (todo) => {
  try {
    const { status } = await client({
      url: '/todos',
      method: 'POST',
      data: todo
    })
    return status
  } catch (err) {
    throw new Error(err)
  }
}

const UpdateTodoAsync = async (todo) => {
  const todos = await GetTodosLocalAsync()
  await todos.forEach(x => UpdateTodo(x, todo))
  store.set('todos', todos)
}

const GetTodosLocalAsync = async () => {
  try {
    return await store.getItem('todos') || []
  } catch (err) {
    throw new Error(err)
  }
}

const getTodosApi = async () => {
  try {
    const { status, data } = await client({
      url: '/todos',
      method: 'GET'
    })
    if (status === 200) {
      return data
    } else {
      return []
    }
  } catch (err) {
    throw new Error(err)
  }
}

const GetTodoLocalByIdAsync = async (id) => {
  try {
    const todos = await GetTodosLocalAsync()
    const todo = todos.filter(x => x.id === id)
    if (todo.length === 0) {
      return {
        name: '',
        done: false,
        items: []
      }
    } else {
      return todo.reduce(x => x)
    }
  } catch (err) {
    throw new Error(err)
  }
}

const getTodoApiById = async (id) => {
  try {
    const { status, data } = await client({
      url: '/todos/' + id,
      method: 'GET'
    })
    if (status === 200) {
      return data
    } else {
      return {
        name: '',
        done: false,
        items: []
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}

const RemoveTodoAsync = async (id) => {
  const todos = await GetTodosLocalAsync()
  const todo = await todos.filter(x => x.id === id).reduce(x => x)
  await todos.splice(todos.indexOf(todo), 1)
  store.set('todos', todos)
}

export {
  InsertLocalAsync,
  RemoveTodoAsync,
  UpdateTodoAsync,
  GetTodosLocalAsync,
  GetTodoLocalByIdAsync,

  InsertApiAsync,
  getTodosApi,
  getTodoApiById
}
