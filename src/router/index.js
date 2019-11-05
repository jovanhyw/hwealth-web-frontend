import Vue from 'vue'
import VueRouter from 'vue-router'
import { TokenService } from '@/services/storage.service'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
    meta: {
      public: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About'),
    meta: {
      public: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register'),
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/account/reset-password',
    name: 'reset-password',
    component: () => import('@/views/ResetPassword'),
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/ForgotPassword'),
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/resend-email-token',
    name: 'resend-email-token',
    component: () => import('@/views/ResendEmail'),
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/account/recover',
    name: 'account-recover',
    component: () => import('@/views/AccountRecover'),
    meta: {
      public: true
    }
  },
  {
    path: '/account/tfa-disabled',
    name: 'tfa-disabled',
    component: () => import('@/views/TfaDisabled'),
    meta: {
      public: true
    }
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
    path: '/tfa',
    name: 'tfa',
    component: () => import('@/views/TwoFaVerification'),
    meta: {
      onlyForTfa: true,
      onlyForThoseWhoHaveNotAuthenticate: true
    }
  },
  {
    path: '/steps-record/',
    name: 'steps-record',
    component: () => import('@/views/StepsRecord')
  },
  {
    path: '/calories-record/',
    name: 'calories-record',
    component: () => import('@/views/CaloriesRecord')
  },
  {
    path: '/chats/',
    name: 'chats',
    component: () => import('@/views/Chats')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(
    record => record.meta.onlyWhenLoggedOut
  )
  const onlyForTfa = to.matched.some(record => record.meta.onlyForTfa)
  const onlyForThoseWhoHaveNotAuthenticate = to.matched.some(
    record => record.meta.onlyForThoseWhoHaveNotAuthenticate
  )

  const loggedIn = !!TokenService.getToken()
  const tfaEnabled = !!(TokenService.getTfaState() === 'false' ? false : true)
  const tfaAuthenticated = !!(TokenService.getTfaAuth() === 'false'
    ? false
    : true)

  // if route is private & user not loggedIn
  // redirect to login page
  if (!isPublic && !loggedIn) {
    return next({
      path: '/',
      query: { redirect: to.fullPath } // Store the full path to redirect the user to after login
    })
  }

  // this code not working
  // if user is logged in, and have tfa enabled, and tfa is not authenticated
  // if (tfaAuthenticated === false) {
  //   return next('/two-factor')
  // }

  // Do not allow user to visit login page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next('/dashboard')
  }

  // Do not allow user to visit tfa page if they did not enable tfa
  if (!tfaEnabled && onlyForTfa) {
    return next('/dashboard')
  }

  // Do not allow user to visit tfa page if they already authenticated 2fa
  if (tfaAuthenticated && onlyForThoseWhoHaveNotAuthenticate) {
    return next('/dashboard')
  }

  next()
})

export default router
