import './styles/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
//import router from './router'
import { OhVueIcon } from 'oh-vue-icons'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/routes'
import '@/utils/importIcons'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
