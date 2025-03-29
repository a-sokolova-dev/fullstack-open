import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  if (response.data.token) {
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.data))
  }
  return response.data
}

export default { login }