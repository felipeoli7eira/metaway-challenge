import * as Vue from 'vue'

// pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

// vue-router
import router from './router'

// prime icons
import 'primeicons/primeicons.css'

// axios
import http from './services/http'
import VueAxios from 'vue-axios'

// vue-hot-toast
import '@steveyuowo/vue-hot-toast/vue-hot-toast.css'

// global css
import './app.css'
import './tailwindcss.css'

// vue the mask
import VueTheMask from 'vue-the-mask'

// Root component
import App from './App.vue'

// Create app
const app = Vue.createApp(App)

// axios setup
app.use(VueAxios, http)
app.provide('$http', app.config.globalProperties.$http)

// router setup
app.use(router)

// pinia setup
app.use(pinia)

// vue the mask
app.use(VueTheMask as unknown as any)

// mount
app.mount('#app')
