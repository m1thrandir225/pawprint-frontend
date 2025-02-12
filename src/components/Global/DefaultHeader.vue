<template>
  <div class="flex flex-row items-center justify-between w-full p-4">
    <RouterLink to="/" class="group">
      <DefaultLogo
        class="w-[72px] h-auto group-hover:opacity-50 ease-in-out duration-100 transition-all"
      />
    </RouterLink>
    <div v-if="!authStore.isAuthenticated" class="flex flex-row items-center gap-2">
      <DefaultRouteLink to="/login" text="Login" />
      <DefaultRouteLink to="/register" text="Register" />
      <ToggleDarkMode />
    </div>
    <div v-else class="flex flex-row items-center gap-2">
      <DefaultRouteLink to="/browse" text="Browse" v-if="authStore.userType == 'user'" />
      <DefaultRouteLink to="/my-listings" text="My Listings" />
      <DefaultRouteLink to="/my-requests" text="My Requests" v-if="authStore.userType == 'user'" />
      <ToggleDarkMode />
      <DefaultUserActionMenu />
    </div>
  </div>
</template>

<script setup lang="ts">
import useAuthStore from '@/stores/auth-store'
import { RouterLink } from 'vue-router'
import ToggleDarkMode from '../ToggleDarkMode.vue'
import DefaultLogo from './DefaultLogo.vue'
import DefaultRouteLink from './DefaultRouteLink.vue'
import DefaultUserActionMenu from './DefaultUserActionMenu.vue'

const authStore = useAuthStore()

defineOptions({
  name: 'DefaultHeader',
})
</script>
