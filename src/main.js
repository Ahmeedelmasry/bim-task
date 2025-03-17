import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from '@/plugins/vuetify'
import DeleteIPopup from './components/shared/DeleteIPopup.vue'

import App from './App.vue'
import router from './router/index.js'

import '@/assets/style/main.scss'
import axiosClient from '../HTTPClient'

const app = createApp(App)

app.use(createPinia()).use(router).use(vuetify)

window.axios = axiosClient

app.component('DeleteIPopup', DeleteIPopup).mount('#app')
