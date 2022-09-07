<template>
  <div class="chat-room-container">
    <h2>Chat</h2>
    <div @click="$emit('close')" class="close-btn">X</div>
    <h3 v-if="typingUser">{{ typingUser }} is typing...</h3>
    <div class="chat-list">
      <p
        v-for="(msg, idx) in [...msgHistory, ...msgs]"
        :key="idx"
        class="chat-msg"
      >
        {{ msg.username }}: {{ msg.txt }}
      </p>
    </div>
    <div class="send-box flex">
      <input
        class="grow-1"
        type="text"
        v-model="msg"
        @input="typing"
        placeholder="Write your message"
      />
      <button @click="sendMsg" class="btn">Send</button>
    </div>
  </div>
</template>

<script>
  import {socketService} from '../services/socket.service.js'
  import {debounce} from '../services/util.service.js'

  export default {
    name: 'chat-room',
    props: {
      toyId: String,
      msgHistory: Array,
    },
    data() {
      return {
        msg: '',
        msgs: [],
        typingUser: null,
      }
    },
    created() {
      //2
      socketService.emit('chat topic', this.toyId)
      //3
      //get data from backend using socket, listen to event
      socketService.on('chat addMsg', this.addMsg)
      //4
      socketService.on('user-typing', (username) => {
        this.typingUser = username
      })
      this.bounce = debounce(this.clearTyping)
    },
    computed: {
      user() {
        return this.$store.getters.getUser
      },
    },
    methods: {
      addMsg(msg) {
        this.msgs.push(msg)
      },
      sendMsg() {
        const msg = {
          txt: this.msg,
          username: this.user?.username || 'Guest',
        }
        //send data to backend using socket
        socketService.emit('chat newMsg', msg)
        this.msg = ''
      },
      typing() {
        this.setTyping()
        this.bounce()
      },
      setTyping() {
        socketService.emit('user-typing', this.user?.username || 'Guest')
      },
      clearTyping() {
        socketService.emit('user-typing', null)
      },
    },

    unmounted() {
      socketService.off('chat addMsg', this.addMsg)
      socketService.off('user-typing')
    },
  }
</script>

<style lang="scss">
  .chat-room-container {
    position: fixed;
    bottom: 4px;
    right: 4px;
    background-color: rgba(144, 238, 144, 0.13);
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 0 2px 1px #0000002a, -2px -2px 1px 1px #00000011;
    .chat-list {
      min-height: 250px;
    }
    .chat-msg:nth-child(even) {
      background-color: #e1e1e18f;
    }
    .send-box {
      height: 35px;
    }
    .close-btn {
      position: absolute;
      right: 8px;
      top: 8px;
      font-weight: 700;
      cursor: pointer;
    }
  }
</style>
