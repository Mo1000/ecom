import './styles/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
//import router from './router'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'
import AppState from '@/plugins/appState'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import { OhVueIcon } from 'oh-vue-icons'
import Noir from '@/presents/Noir'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/routes'
import { SELECTOR_DARK_THEME } from '@/constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      prefix: 'p',
      darkModeSelector: `.${SELECTOR_DARK_THEME}`,
      cssLayer: false
    }
  }
})
app.use(AppState)
app.use(ConfirmationService)
app.use(ToastService)
app.use(DialogService)
app.component('ThemeSwitcher', ThemeSwitcher)
app.component('v-icon', OhVueIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
