import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.aiworksfine.com',
  headers: {
    Authorization: 'Bearer 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',
    'Content-Type': 'application/json'
  }
})

export default instance
