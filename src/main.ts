import { createApp } from 'vue'
import { router } from '@/routes'
import { createPinia } from 'pinia'
import App from './App.vue'

import '@/plugins/firebase'

import '@/assets/styles/tailwind.scss'
import '@/assets/styles/main.scss'

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
