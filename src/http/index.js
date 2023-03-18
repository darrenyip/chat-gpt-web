import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.aiworksfine.com',
  headers: {
    Authorization: 'Bearer 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',
    'Content-Type': 'application/json'
  }
})

export default instance
