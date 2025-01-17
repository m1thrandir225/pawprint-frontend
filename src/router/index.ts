import { createRouter, createWebHistory } from 'vue-router'
import ComingSoonView from '@/views/ComingSoonView.vue'
import RegisterOverviewView from '@/views/RegisterOverviewView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterUserView from '@/views/RegisterUserView.vue'
import RegisterShelterView from '@/views/RegisterShelterView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ComingSoonView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterOverviewView,
      meta: { transition: 'slide-left' },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { transition: 'slide-up' },
    },
    {
      path: '/register/user',
      name: 'registerUser',
      component: RegisterUserView,
      meta: { transition: 'slide-right' },
    },
    {
      path: '/register/shelter',
      name: 'registerShelter',
      component: RegisterShelterView,
      meta: { transition: 'slide-right' },
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
