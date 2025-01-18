<template>
  <div class="flex flex-row items-center justify-between w-full p-4">
    <DefaultTitle text="PawPrint" :font-size="32" />
    <div v-if="!authStore.isAuthenticated" class="flex flex-row items-center gap-2">
      <DefaultRouteLink to="/login" text="Login" />
      <DefaultRouteLink to="/register" text="Register" />
    </div>
    <div v-else>
      <Button variant="link" @click="authStore.logout">Logout</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAuthStore from '@/stores/auth-store'
import DefaultRouteLink from './DefaultRouteLink.vue'
import DefaultTitle from './DefaultTitle.vue'
import Button from '../ui/button/Button.vue'

const authStore = useAuthStore()

defineOptions({
  name: 'DefaultHeader',
})
</script>
