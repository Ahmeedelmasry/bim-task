import axios from 'axios'

const axiosClient = axios.create({
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
  LANG: 'en',
})

axiosClient.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  },
)

export default axiosClient
