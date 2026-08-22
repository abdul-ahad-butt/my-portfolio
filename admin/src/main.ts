import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify, Dialog, Loading } from 'quasar'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router/routes'

// Import Quasar icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import app-level CSS (custom global styles)
import './css/app.scss'

import App from './App.vue'

const pinia = createPinia()

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Quasar, {
  plugins: { Notify, Dialog, Loading },
  config: {
    dark: true,
    brand: {
      primary: '#10b981',
      secondary: '#06b6d4',
      accent: '#14b8a6',
      dark: '#0a0f1a',
      'dark-page': '#0d1526',
      positive: '#10b981',
      negative: '#ef4444',
      info: '#06b6d4',
      warning: '#f59e0b',
    },
    notify: {
      position: 'top-right',
      timeout: 3000,
    },
  },
})

app.mount('#app')
