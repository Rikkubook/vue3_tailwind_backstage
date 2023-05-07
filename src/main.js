import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'
import { createRouter, createWebHistory  } from 'vue-router'
import routes from '~pages'
import Notifications from '@kyvg/vue3-notification'
import Chart from 'chart.js/auto';


const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).use(Notifications).mount('#app')
