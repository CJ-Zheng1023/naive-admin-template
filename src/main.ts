import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from './App.vue'
import iconComponent from '@/plugins/carbon'
import { useGuard } from '@/router/guard'
import '@/styles/index.less'
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(iconComponent)
app.mount('#app')
useGuard()
