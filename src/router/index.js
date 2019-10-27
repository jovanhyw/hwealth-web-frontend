import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/Settings')
  },
  {
    path: '/account/reset-password',
    name: 'reset-password',
    component: () => import('@/views/ResetPassword')
  },
  {
    path: '/tfa',
    name: 'tfa',
    component: () => import('@/views/TwoFaVerification')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
