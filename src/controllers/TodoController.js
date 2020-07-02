import { InsertLocalAsync, GetTodosLocalAsync, RemoveTodoAsync, GetTodoLocalByIdAsync, UpdateTodoAsync } from '../services/TodoService'

const CreateAsync = async (todo) => await InsertLocalAsync(todo)

const UpdateAsync = async (todo) => await UpdateTodoAsync(todo)

const DeleteAsync = async (id) => await RemoveTodoAsync(id)

const GetAllAsync = async () => await GetTodosLocalAsync()

const GetByIdAsync = async (id) => await GetTodoLocalByIdAsync(id)

export {
  CreateAsync,
  UpdateAsync,
  DeleteAsync,
  GetAllAsync,
  GetByIdAsync
}
