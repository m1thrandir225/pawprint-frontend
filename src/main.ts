import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vueform from '@vueform/vueform'
import vueformConfig from './../vueform.config'

import App from './App.vue'
import router from './router'
import DefaultHeader from './components/DefaultHeader.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vueform, vueformConfig)

app.component('DefaultHeader', DefaultHeader)

app.mount('#app')
