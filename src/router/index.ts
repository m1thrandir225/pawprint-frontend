import AdminPetsView from '@/components/Admin/Pets/AdminPetsView.vue'
import layouts from '@/layouts'
import useAuthStore from '@/stores/auth-store'
import AdminHomeView from '@/views/admin/AdminHomeView.vue'
import AvaliableListingsView from '@/views/AvaliableListingsView.vue'
import ComingSoonView from '@/views/ComingSoonView.vue'
import CreateOwnerPetListing from '@/views/CreateOwnerPetListing.vue'
import CreateShelterPetListing from '@/views/CreateShelterPetListing.vue'
import LoginView from '@/views/LoginView.vue'
import MyListingsView from '@/views/MyListingsView.vue'
import MyListingView from '@/views/MyListingView.vue'
import MyRequestsView from '@/views/MyRequestsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import OwnerPetListingView from '@/views/OwnerPetListingView.vue'
import RegisterOverviewView from '@/views/RegisterOverviewView.vue'
import RegisterShelterView from '@/views/RegisterShelterView.vue'
import RegisterUserView from '@/views/RegisterUserView.vue'
import ShelterPetListingView from '@/views/ShelterPetListingView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ComingSoonView,
      meta: { layout: layouts.empty, requiresAuth: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterOverviewView,
      meta: { layout: layouts.default, requiresAuth: false },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: layouts.default, requiresAuth: false },
    },
    {
      path: '/register/user',
      name: 'registerUser',
      component: RegisterUserView,
      meta: { layout: layouts.default, requiresAuth: false },
    },
    {
      path: '/register/shelter',
      name: 'registerShelter',
      component: RegisterShelterView,
      meta: { layout: layouts.default, requiresAuth: false },
    },
    {
      path: '/browse',
      name: 'avaliableListings',
      component: AvaliableListingsView,
      meta: { layout: layouts.default, requiresAuth: true },
    },
    {
      path: '/listing/:id',
      name: 'shelterListing',
      component: ShelterPetListingView,
      meta: { layout: layouts.default, requiresAuth: true },
    },
    {
      path: '/owner-listing/:id',
      name: 'ownerListing',
      component: OwnerPetListingView,
      meta: { layout: layouts.default, requiresAuth: true },
    },
    {
      path: '/create-shelter-listing',
      name: 'createShelterListing',
      component: CreateShelterPetListing,
      meta: { layout: layouts.default, requiresAuth: true },
    },
    {
      path: '/create-owner-listing',
      name: 'createOwnerListing',
      component: CreateOwnerPetListing,
      meta: { layout: layouts.default, requiresAuth: true },
    },
    {
      path: '/my-listings',
      name: 'myListings',
      component: MyListingsView,
      meta: { layout: layouts.default, requiresAuth: true },
    },
    {
      path: '/my-listings/:id',
      name: 'myListing',
      component: MyListingView,
      meta: { layout: layouts.default, requiresAuth: true },
    },
    {
      path: '/my-listings/:id/edit',
      name: 'editMyListing',
      component: CreateShelterPetListing,
      meta: { layout: layouts.default, requiresAuth: true },
    },
    {
      path: '/my-requests',
      name: 'myRequests',
      component: MyRequestsView,
      meta: { layout: layouts.default, requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView,
      meta: { layout: layouts.default, requiresAuth: false },
    },
    {
      path: '/admin',
      name: 'adminHome',
      component: AdminHomeView,
      meta: { layout: layouts.admin, requiresAuth: true },
    },
    {
      path: '/admin/pets',
      name: 'admin.pets',
      component: AdminPetsView,
      meta: { layout: layouts.admin, requiresAuth: true },
    },
    {
      path: '/admin/pet-types',
      name: 'admin.petTypes',
      component: AdminHomeView,
      meta: { layout: layouts.admin, requiresAuth: true },
    },
    {
      path: '/admin/pet-genders',
      name: 'admin.petGenders',
      component: AdminHomeView,
      meta: { layout: layouts.admin, requiresAuth: true },
    },
    {
      path: '/admin/pet-sizes',
      name: 'admin.petSizes',
      component: AdminHomeView,
      meta: { layout: layouts.admin, requiresAuth: true },
    },
    {
      path: '/admin/users-overview',
      name: 'admin.usersOverview',
      component: AdminHomeView,
      meta: { layout: layouts.admin, requiresAuth: true },
    },
    {
      path: '/admin/shelters',
      name: 'admin.shelters',
      component: AdminHomeView,
      meta: { layout: layouts.admin, requiresAuth: true },
    },
    {
      path: '/admin/users',
      name: 'admin.users',
      component: AdminHomeView,
      meta: { layout: layouts.admin, requiresAuth: true },
    },
    {
      path: '/admin/user-roles',
      name: 'admin.roles',
      component: AdminHomeView,
      meta: { layout: layouts.admin, requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  // Redirect to login if user is not authenticated and tries to access a route that requires authentication
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  } else {
    // Redirect to browse if user is already authenticated and tries to access login or register
    if (
      (to.name === 'login' ||
        to.name === 'register' ||
        to.name === 'registerUser' ||
        to.name === 'registerShelter') &&
      auth.isAuthenticated
    ) {
      next({ path: '/browse' })
    }

    if (to.name === 'home' && auth.isAuthenticated) {
      next({ path: '/browse' })
    }
    next()
  }
})

export default router
