import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl+'blogs')
  return request.then(response => response.data)
}

const login = async (credentials) =>{
  const response = await axios.post(baseUrl+'login',credentials)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl+'blogs', newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${ baseUrl }blogs/${id}`, newObject, config)
  return request.then(response => response.data)
}

export default { getAll, login, create, update, setToken }