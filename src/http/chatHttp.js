import instance from '.'
const model_three = 'gpt-3.5-turbo-16k-0613'
import.meta.env.VITE_API_KEY
const getAns = (context) => {
  let url = '/v1/chat/completions'
  let payload = {
    model: model_three,
    messages: context
  }
  console.log('current : ', payload.model)

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
const getModels = async () => {
  let url = '/v1/models'
  let response = await instance.get(url)
  console.log(response)
}
getModels()

export default { getAns }
