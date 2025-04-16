import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import {useSocketStore} from "./store/socketStore.js";


const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.mount('#app')

const socketStore = useSocketStore();
socketStore.initializeSocket();
