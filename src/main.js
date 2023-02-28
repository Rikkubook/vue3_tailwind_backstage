import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'
import { createRouter, createWebHistory  } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
