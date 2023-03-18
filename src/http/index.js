import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.aiworksfine.com',
  headers: {
    Authorization: 'Bearer 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',
    'Content-Type': 'application/json'
  }
})

export default instance
