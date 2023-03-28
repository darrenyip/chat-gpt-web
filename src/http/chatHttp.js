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

const getStreamAns = async (context, textOnScreen = '') => {
  let url = '/v1/chat/completions'
  const config = {
    responseType: 'stream'
  }
  let payload = {
    model: 'gpt-3.5-turbo',
    messages: context,
    stream: true
  }

  const response = await instance.post(url, payload, config)
  const stream = response.data
  console.log(stream)
  // for (let key in stream) {
  //   console.log(stream[key])
  //   textOnScreen += stream[key]
  // }
  // console.log(textOnScreen)

  stream.on('data', (data) => {
    console.log(data)
  })
  stream.on('end', () => {
    console.log('stream done')
  })
}

const getStreamAns2 = async (context) => {
  const config = {
    responseType: 'stream'
  }
  let payload = {
    model: 'gpt-3.5-turbo',
    messages: context,
    stream: true
  }
  var es = new EventSource('https://www.aiworksfine.com/v1/chat/completions', payload, config)
  es.onmessage = function (event) {
    console.log('event Data: ', event.data)
  }
}

export default { getAns, getStreamAns, getStreamAns2 }
