import Axios from 'axios'
import { Notify } from 'quasar'

const ApiUrlBase = process.env.DEV ? 'https://localhost:5001' : 'https://api-todo-app.herokuapp.com'

const client = Axios.create({
  baseURL: ApiUrlBase,
  headers: {
    'Content-Type': 'application/json',
    'X-version': 1.0
  }
})

const PostAsync = async (todo) => {
  try {
    const { status } = await client({
      url: '/todos',
      method: 'POST',
      data: todo
    })
    if (status === 200) {
      Notify.create({
        message: 'Todo criado com sucesso',
        position: 'top-right',
        timeout: 3000,
        progress: true
      })
      return status
    } else {
      Notify.create({
        message: 'Falha ao criar todo',
        position: 'bottom-right',
        timeout: 3000,
        color: 'negative',
        progress: true
      })
      return status
    }
  } catch (err) {
    throw new Error(err)
  }
}

const UpdateAsync = async (todo) => {
  try {
    const { status } = await client({
      url: '/todos',
      method: 'PUT',
      data: todo
    })
    if (status === 200) {
      Notify.create({
        message: todo.name,
        caption: 'Atualizado com sucesso',
        position: 'top-right',
        timeout: 3000,
        progress: true,
        color: 'primary'
      })
      return status
    } else {
      Notify.create({
        message: 'Falha ao atualizar todo',
        position: 'bottom-right',
        timeout: 3000,
        color: 'negative',
        progress: true
      })
      return status
    }
  } catch (err) {
    throw new Error(err)
  }
}

const DeleteAsync = async (id) => {
  try {
    const { status } = await client({
      url: '/todos/' + id,
      method: 'DELETE'
    })
    if (status === 200) {
      Notify.create({
        timeout: 3000,
        position: 'top-right',
        message: 'Apagado com sucesso',
        textColor: 'primary',
        progress: true
      })
      return status
    } else {
      Notify.create({
        message: 'Falha ao apagar todo',
        position: 'bottom-right',
        timeout: 3000,
        color: 'negative',
        progress: true
      })
      return status
    }
  } catch (err) {
    throw new Error(err)
  }
}

const GetAllAsync = async () => {
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

const GetByIdAsync = async (id) => {
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

export {
  PostAsync,
  UpdateAsync,
  DeleteAsync,
  GetAllAsync,
  GetByIdAsync
}
