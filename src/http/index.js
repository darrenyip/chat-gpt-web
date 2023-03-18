import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.aiworksfine.com',
  headers: {
    Authorization: 'Bearer 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',
    'Content-Type': 'application/json'
  }
})

export default instance
