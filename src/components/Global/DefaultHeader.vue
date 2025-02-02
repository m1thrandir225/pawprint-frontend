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
    </div>
    <div v-else class="flex flex-row items-center gap-2">
      <DefaultRouteLink to="/browse" text="Browse" v-if="authStore.userType == 'user'" />
      <DefaultRouteLink to="/my-listings" text="My Listings" />
      <DefaultRouteLink to="/my-requests" text="My Requests" v-if="authStore.userType == 'user'" />
    </div>
    <div class="flex flex-row items-center gap-4">
      <ToggleDarkMode />
      <Button size="icon" variant="outline" @click="logout" class="rounded-none text-primary">
        <LogOut class="w-6 h-6" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAuthStore from '@/stores/auth-store'
import DefaultRouteLink from './DefaultRouteLink.vue'
import { useRouter } from 'vue-router'
import { LogOut } from 'lucide-vue-next'
import ToggleDarkMode from '../ToggleDarkMode.vue'
import DefaultLogo from './DefaultLogo.vue'
import { Button } from '../ui/button'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } })
}

defineOptions({
  name: 'DefaultHeader',
})
</script>
