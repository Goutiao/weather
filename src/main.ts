import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { Icon } from 'vant';
import 'amfe-flexible'
// import "@/utils/polyfill"
// import "../node_modules/default-passive-events/dist/index.js"
import "default-passive-events"
import { createPinia } from 'pinia';
import * as echarts from 'echarts/core';
const app = createApp(App)
const pinia = createPinia()
app.use(router).use(Icon).use(pinia).mount('#app')
app.config.globalProperties.$echarts = echarts
