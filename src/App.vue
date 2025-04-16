
<template>
  <div class="h0"><span>{{ formattedDate }}</span> <span>{{ formattedTime }}</span></div>
  <div class="blink">{{ benvenutoMsg }}</div>
<!--  <div class="neon-container">-->
<!--    <h1 class="neon-text">{{benvenutoMsg}}</h1>-->

  <div :key="chiaveInglese" class="bottom"><span>XL250102</span> <span :class="statusClass">{{ statusText }}</span></div>
</template>

<script>

import {useSocketStore} from './store/socketStore.js'

export default {
  data() {
    return {
      socketStore: useSocketStore(),
      benvenutoMsg: "LETTURA BADGE",
      buttonMsg: "Premimi...",
      array: ["due", "stringhe"],
      count: 0,
      ilnomediunbooleano: false,
      currentDate: new Date(),
      connectionStatus: 'ONLINE',
      chiaveInglese: 0,
    }
  },

  computed: {
    formattedDate() {
      const day = String(this.currentDate.getDate()).padStart(2, '0');
      const month = String(this.currentDate.getMonth() + 1).padStart(2, '0'); // months are 0-based
      const year = this.currentDate.getFullYear();
      return `${day}/${month}/${year}`;
    },
    formattedTime() {
      const hours = String(this.currentDate.getHours() + 1).padStart(2, '0');
      const minutes = String(this.currentDate.getMinutes()).padStart(2, '0');
      const seconds = String(this.currentDate.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },
    statusClass() {
      return {
        online: this.connectionStatus === 'ONLINE',
        offline: this.connectionStatus !== 'ONLINE'
      };
    },
    statusText() {
      return this.connectionStatus === 'ONLINE' ? 'CONNESSO' : 'DISCONNESSO';
    }
  },

  methods: {
    sendEventToBackend() {
        this.socketStore.emitEvent("frontend-event", { message: "Hello from frontend" });
        },
    oraToccalo() {
      this.benvenutoMsg = "Adesso è cambiato!"
      this.buttonMsg = "Mi hai premuto!"
    }
  },

  mounted() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    this.chiaveInglese++;
  }
}

</script>

<style scoped>

</style>
