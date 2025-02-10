<template>
  <Sidebar collapsible="icon" class="bg-[hsl(var(--sidebar-background))]">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div
              class="flex items-center justify-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <RouterLink :to="{ name: 'admin.home' }">
                <DefaultLogo />
              </RouterLink>
            </div>
            <h1 class="text-2xl font-bold font-splieSans text-primary">PawPrint</h1>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu class="gap-4">
          <SidebarMenuItem v-for="item in navLinks" :key="item.title">
            <SidebarMenuButton
              as-child
              :tooltip="item.title"
              :is-active="item.to.name === route.name"
            >
              <RouterLink
                :to="item.to"
                class="flex-1 px-4 py-5 transition-all duration-100 ease-in-out hover:bg-primaryContainer hover:text-primaryContainer-foreground"
                :class="
                  item.to.name === route.name
                    ? 'bg-accentContainer text-accentContainer-foreground'
                    : 'bg-muted text-muted-foreground'
                "
              >
                <Icon :icon="item.icon" class="w-10 h-10" />
                <span>{{ item.title }}</span>
              </RouterLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Go to Home"
            @click="goToHome()"
            class="px-4 py-5 transition-all duration-100 ease-in-out bg-muted text-muted-foreground hover:bg-primaryContainer hover:text-primaryContainer-foreground"
          >
            <Home class="w-6 h-6" />
            <span>Go to Home</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            :tooltip="isDark ? 'Light Mode' : 'Dark Mode'"
            @click="toggleDark()"
            class="px-4 py-5 transition-all duration-100 ease-in-out bg-muted text-muted-foreground hover:bg-primaryContainer hover:text-primaryContainer-foreground"
          >
            <Sun v-if="isDark" class="w-6 h-6" />
            <Moon v-else class="w-6 h-6" />
            <span v-if="isDark">Light Mode</span>
            <span v-else>Dark Mode</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Logout"
            @click="logout()"
            class="px-4 py-5 transition-all duration-100 ease-in-out bg-muted text-muted-foreground hover:bg-primaryContainer hover:text-primaryContainer-foreground"
          >
            <LogOut class="w-6 h-6" />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>

<script setup lang="ts">
import { Home, LogOut, Moon, Sun } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DefaultLogo from '../Global/DefaultLogo.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '../ui/sidebar'
import { Icon } from '@iconify/vue'
import useAuthStore from '@/stores/auth-store'
import { useDark, useToggle } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isDark = useDark()

const toggleDark = useToggle(isDark)

const goToHome = () => {
  router.push({ name: 'avaliableListings' })
}

const logout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}

const navLinks = ref([
  {
    title: 'Pets',
    to: { name: 'admin.pets' },
    icon: 'lucide:dog',
  },
  {
    title: 'Pet Types',
    to: { name: 'admin.petTypes' },
    icon: 'lucide:type-outline',
  },
  {
    title: 'Pet Genders',
    to: { name: 'admin.petGenders' },
    icon: 'icons8:gender',
  },
  {
    title: 'Pet Sizes',
    to: { name: 'admin.petSizes' },
    icon: 'lucide:ruler',
  },
  {
    title: 'Health Statuses',
    to: { name: 'admin.healthStatuses' },
    icon: 'lucide:pill-bottle',
  },
  {
    title: 'Adoption Statuses',
    to: { name: 'admin.adoptionStatuses' },
    icon: 'streamline:pet-paw',
  },
  {
    title: 'Adopters',
    to: { name: 'admin.adopters' },
    icon: 'lucide:users',
  },
  {
    title: 'Shelters',
    to: { name: 'admin.shelters' },
    icon: 'lucide:house',
  },
  {
    title: 'Roles',
    to: { name: 'admin.roles' },
    icon: 'carbon:user-role',
  },
])
</script>
