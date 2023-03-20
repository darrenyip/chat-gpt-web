import axios from 'axios'
const apiKey = import.meta.env.VITE_API_KEY

const instance = axios.create({
  baseURL: 'https://www.aiworksfine.com',
  headers: {
    Authorization: 'Bearer ' + apiKey,
    'Content-Type': 'application/json'
  }
})

export default instance
