import instance from '.'
const getAns = (context) => {
  let url = '/v1/chat/completions'
  let payload = {
    model: 'gpt-3.5-turbo',
    messages: context
  }

  return new Promise((resolve, reject) => {
    instance
      .post(url, payload)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(new Error(err))
      })
  })
}
export default { getAns }
