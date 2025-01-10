import { createRouter, createWebHistory } from 'vue-router'
import ComingSoonView from '@/views/ComingSoonView.vue'
import RegisterOverviewView from '@/views/RegisterOverviewView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterUserView from '@/views/RegisterUserView.vue'
import RegisterShelterView from '@/views/RegisterShelterView.vue'
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
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register/user',
      name: 'registerUser',
      component: RegisterUserView,
    },
    {
      path: '/register/shelter',
      name: 'registerShelter',
      component: RegisterShelterView,
    },
  ],
})

export default router
