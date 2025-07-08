import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import AdminPanelWrapper from './components/AdminPanelWrapper.vue'
import AdminRegister from './components/AdminRegister.vue'
import AdminLogin from './components/AdminLogin.vue'

const routes = [
  { path: '/adminpanel', component: AdminPanelWrapper },
  { path: '/adminregister', component: AdminRegister },
  { path: '/adminlogin', component: AdminLogin },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
