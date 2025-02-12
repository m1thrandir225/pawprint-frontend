<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" class="relative w-10 h-10 rounded-lg">
        <Avatar class="w-10 h-10 rounded-lg bg-muted">
          <AvatarFallback class="">{{ getUserInitials() }}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel class="flex font-normal">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">
            {{ nameOfUser }}
          </p>
          <p class="text-xs leading-none text-muted-foreground">{{ authStore.user?.email }}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem as-child v-if="authStore.userIsAdmin">
        <RouterLink :to="{ name: 'admin.home' }">
          <Shield class="w-6 h-6" />
          <span>Admin Dashboard</span>
        </RouterLink>
      </DropdownMenuItem>
      <DropdownMenuItem as-child class="w-full">
        <Button variant="ghost" @click="logout" class="flex flex-row items-center justify-start">
          <LogOut class="w-6 h-6" />
          <span> Logout </span>
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import useAuthStore from '@/stores/auth-store'
import type { ShelterDTO } from '@/types/dto/ShelterDTO'
import type { UserDTO } from '@/types/dto/UserDTO'
import { LogOut, Shield } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const router = useRouter()
const authStore = useAuthStore()
const logout = () => {
  authStore.logout()
  router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } })
}

const nameOfUser = computed(() => {
  const userType = authStore.userType
  const isAuthenticated = authStore.isAuthenticated
  if (!isAuthenticated) return ''

  if (userType == 'shelter') {
    const user = authStore.user as ShelterDTO
    return user.name
  } else {
    const user = authStore.user as UserDTO
    return `${user.firstName} ${user.lastName}`
  }
})

const getUserInitials = () => {
  const userType = authStore.userType
  const isAuthenticated = authStore.isAuthenticated
  if (!isAuthenticated) return ''
  if (userType == 'shelter') {
    const user = authStore.user as ShelterDTO
    return user.name.charAt(0).toUpperCase() + user.name.charAt(1).toUpperCase()
  } else {
    const user = authStore.user as UserDTO

    return user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()
  }
}
</script>
