import axios from 'axios'
const baseUrl = '/api/blogs'

const getTokenFromStorage = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (!loggedUserJSON) return null
  const user = JSON.parse(loggedUserJSON)
  return `Bearer ${user.token}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const token = getTokenFromStorage()
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, updatedBlog) => {
  const token = getTokenFromStorage()
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

export default { getAll, create, update }