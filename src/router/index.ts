import { createRouter, createWebHistory } from 'vue-router'
import ComingSoonView from '@/views/ComingSoonView.vue'
import RegisterOverviewView from '@/views/RegisterOverviewView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterUserView from '@/views/RegisterUserView.vue'
import RegisterShelterView from '@/views/RegisterShelterView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import useAuthStore from '@/stores/auth-store'
import AdoptionDetails from '@/views/AdoptionDetails.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ComingSoonView,
      meta: { requiresAuth: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterOverviewView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from, next) => {
        const auth = useAuthStore()
        if (auth.isAuthenticated) {
          next({
            path: '/welcome',
          })
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/register/user',
      name: 'registerUser',
      component: RegisterUserView,
      meta: { requiresAuth: false },
    },
    {
      path: '/register/shelter',
      name: 'registerShelter',
      component: RegisterShelterView,
      meta: { requiresAuth: false },
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/adoption/:id',
      name: 'adoption',
      component: AdoptionDetails,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { requiresAuth: false },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    console.log('requiresAuth', to.meta.requiresAuth)
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  } else {
    if (
      to.name === 'login' ||
      to.name === 'register' ||
      to.name === 'registerUser' ||
      to.name === 'registerShelter'
    ) {
      if (auth.isAuthenticated) {
        next({ path: '/welcome' })
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

export default router
