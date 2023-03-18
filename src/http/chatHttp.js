import instance from '.'
const getAns = (question) => {
  let url = '/v1/chat/completions'
  let payload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: question }]
  }

  return new Promise((resolve) => {
    instance.post(url, payload).then((res) => {
      let answer = res.data.choices[0].message.content
      resolve(answer)
    })
  })
}
export default { getAns }
