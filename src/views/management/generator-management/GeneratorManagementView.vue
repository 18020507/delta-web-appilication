<template>
  <div class="container">
    <div class="title">
      <h2>Danh sách Máy Phát</h2>
    </div>
    <!-- <div class="table">
      <GeneratorTable :tableData="listGenerator" />
    </div> -->
    <div v-if="connected">
      <h2>Chat Application</h2>
      <div class="chat">
        <div v-for="message in messages" :key="message">{{ message }}</div>
      </div>
      <div class="input">
        <input
          type="text"
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Type your message..."
        />
        <input type="number" v-model="recipientId" placeholder="Recipient ID" />
      </div>
    </div>
    <div v-else>
      <p>Connecting to server...</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useUserStore } from "@/store/userStore";
export default defineComponent({
  setup() {
    const userStore = useUserStore();

    return { userStore };
  },
  data() {
    return {
      connected: false,
      messages: [],
      newMessage: "",
      socket: null,
      clientId: null,
      recipientId: null,
    };
  },
  created() {
    this.clientId = this.userStore.getUserInfo().id;
    this.connectToWebSocket();
  },
  methods: {
    connectToWebSocket() {
      this.socket = new WebSocket(`ws://localhost:8000/ws/${this.clientId}`);

      this.socket.onopen = () => {
        console.log("connected");
        this.connected = true;
      };

      this.socket.onmessage = (event) => {
        console.log("new message");
        this.messages.push(event.data);
      };

      this.socket.onclose = () => {
        console.log("closed");
        this.connected = false;
      };
    },
    sendMessage() {
      if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
        console.log("WebSocket connection not established");
        return;
      }

      const message = `${this.recipientId}|${this.newMessage}`;
      this.socket.send(message);
      this.newMessage = "";
    },
  },
});
</script>

<style scoped>
.container {
  margin-left: 30px;
  margin-top: 20px;
  margin-right: 50px;
  flex: 1;
}

.chat {
  border: 1px solid #ccc;
  padding: 10px;
  height: 300px;
  overflow-y: scroll;
}

.input {
  margin-top: 10px;
}
</style>
