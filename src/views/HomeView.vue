<script>
const apiKey = import.meta.env.VITE_API_KEY

export default {
  data() {
    return {
      count: 1,
      question: '',
      chatContext: [
        { role: 'user', content: 'You are a helpful assistant.' },
        { role: 'assistant', content: 'I am an assistant. How can I help?' }
      ],
      chats: [],
      chatLoading: false
    }
  },
  //[{ role: 'user', content: question }]
  methods: {
    resizeTextarea() {
      this.$refs.textarea.style.height = 'auto'
      this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px'
    },
    resetTextareaHeight() {
      this.$refs.textarea.style.height = '20px'
    },
    async onGetStreamAns() {
      // push user question to screen
      let userChat = {
        isUser: true,
        content: this.question
      }
      this.chatContext.push({
        role: 'user',
        content: this.question
      })
      this.chats.push(userChat)
      this.question = ''
      let gptChat = {
        isUser: false,
        content: '思考中...'
      }
      this.chats.push(gptChat)

      let payload = {
        model: 'gpt-3.5-turbo',
        messages: this.chatContext,
        stream: true
      }
      const response = await fetch('https://www.aiworksfine.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const reader = response.body.getReader()
        const textDecoder = new TextDecoder()
        let gptRes = ''
        while (true) {
          const { value, done } = await reader.read()
          if (done) {
            break
          }
          const strDataArr = textDecoder.decode(value).split('\n')
          console.log(strDataArr)
          gptRes += this.constructJSONFromArr(strDataArr)
          console.log(gptRes)
          this.chats[this.chats.length - 1].content = gptRes
        }
      } else {
        this.chats[this.chats.length - 1].content = '请重新输入'
        console.error('Error occurred:', response.statusText)
      }
    },
    constructJSONFromArr(arr) {
      let tempStr = ''
      for (const [index, item] of arr.entries()) {
        if (item === '' || item.includes('[DONE]')) continue
        let splitStr = item.slice(6)
        let resJSON = JSON.parse(splitStr)
        if (resJSON.choices[0].delta.content) {
          tempStr += resJSON.choices[0].delta.content
        }
      }
      return tempStr
    }
  }
}
</script>

<template>
  <div class="main-chat">
    <div class="hero" v-if="chats.length == 0">
      <h3>Chat GPT</h3>
      <p>解决你的所有疑问</p>
      <p style="color: #555555">现已接入GPT 4</p>
    </div>
    <div class="chat-window" v-else>
      <div v-for="(item, index) in chats" :key="index">
        <div :class="item.isUser ? 'chatrow userchat-reverse' : 'chatrow botchat-inorder'">
          <div class="chatrow--icon user-icon" v-if="item.isUser">🤔</div>
          <div class="chatrow--icon bot-icon" v-else>🤖</div>
          <div :class="item.isUser ? 'user-content' : 'bot-content'">{{ item.content }}</div>
        </div>
      </div>
    </div>

    <div class="question-inputSection">
      <textarea
        ref="textarea"
        class="no-border"
        rows="1"
        v-model="question"
        placeholder="Ask me any question"
        @input="resizeTextarea"
      ></textarea>

      <button ref="inputButton" @click="onGetStreamAns">
        <svg
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4 mr-1"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.main-chat {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.hero {
  margin-left: 1rem;
  height: 50%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}
.hero h3 {
  color: var(--green-main);
}
.hero p {
  color: rgb(228, 228, 228);
}
.question-inputSection {
  display: flex;
  background-color: #323232;
  border: none;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
}
.question-inputSection textarea {
  color: white;
  resize: none;
  background-color: #323232;
  width: 100%;
  border: none;
  max-height: 200px;
  padding-right: 5px;
  margin-right: 5px;
}
.no-border:focus {
  outline: none;
}
.question-inputSection button {
  padding: 0;
  background-color: #323232;
  color: rgba(142, 142, 160);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-quesiton {
  margin-bottom: 1rem;
}
.gpt-answer {
  margin-bottom: 1rem;
}
.userchat-bg {
  background: rgb(138, 138, 138);
}
.userchat-reverse {
  display: flex;
  flex-direction: row-reverse;
}
.botchat-bg {
  background: rgb(26, 26, 26);
}
.user-content {
  background-color: #353535;
  border-radius: 5px;
  padding: 12px;
}
.chat-window > * {
  margin-bottom: 1rem;
}
.bot-content {
  background-color: #353535;
  width: 100%;
  border-radius: 5px;
  padding: 12px;
}
.user-icon {
  margin-left: 5px;
}
.bot-icon {
  margin-right: 5px;
}
.botchat-inorder {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  flex-direction: row;
}
</style>
