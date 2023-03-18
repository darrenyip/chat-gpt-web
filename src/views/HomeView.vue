<template>
  <div>
    <h1>Hi Brah</h1>
    <div class="chat-window">
      <div v-for="(item, index) in chats" :key="index">
        <div class="user-quesiton">User : {{ item.question }}</div>
        <div class="gpt-answer">GPT :{{ item.answer }}</div>
      </div>
    </div>
    <div class="question-part">
      <input v-model="question" placeholder="Ask me any question" />
      <button @click="onQuestionAsk">Send</button>
    </div>
  </div>
</template>

<script>
import chatHttp from '../http/chatHttp'
export default {
  data() {
    return {
      count: 1,
      question: '',
      chats: []
    }
  },

  // `mounted` is a lifecycle hook which we will explain later
  mounted() {},
  methods: {
    async onQuestionAsk() {
      let answerText = await chatHttp.getAns(this.question)
      let chat = {
        question: this.question,
        answer: answerText
      }
      this.chats.push(chat)
      this.question = ''
    }
  }
}
</script>

<style scoped>
.user-quesiton {
  margin-bottom: 1rem;
}
.gpt-answer {
  margin-bottom: 1rem;
}
</style>
