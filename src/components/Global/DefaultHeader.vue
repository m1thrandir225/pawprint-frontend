<template>
  <div class="flex flex-row items-center justify-between w-full p-4">
    <img src="/pawprint-without-bg-inverted.svg" alt="Logo" class="w-24 h-auto" />
    <div v-if="!authStore.isAuthenticated" class="flex flex-row items-center gap-2">
      <DefaultRouteLink to="/login" text="Login" />
      <DefaultRouteLink to="/register" text="Register" />
    </div>
    <div v-else>
      <DefaultRouteLink to="/my-listings" text="My Listings" />
      <Button variant="link" @click="logout">
        <LogOut class="w-6 h-6" />
        <span class="hidden lg:block">Logout</span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAuthStore from '@/stores/auth-store'
import DefaultRouteLink from './DefaultRouteLink.vue'
import Button from '../ui/button/Button.vue'
import { useRouter } from 'vue-router'
import { LogOut } from 'lucide-vue-next'

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
