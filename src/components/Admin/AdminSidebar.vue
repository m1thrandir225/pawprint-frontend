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
              <DefaultLogo />
            </div>
            <h1 class="text-2xl font-bold font-splieSans text-primary">PawPrint</h1>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem v-for="item in navLinks" :key="item.title">
            <SidebarMenuButton
              as-child
              :tooltip="item.title"
              :is-active="item.to.name === route.name"
            >
              <RouterLink
                :to="item.to"
                class="flex-1 transition-all duration-100 ease-in-out hover:bg-primaryContainer hover:text-primaryContainer-foreground"
                :class="
                  item.to.name === route.name
                    ? 'bg-accentContainer text-accentContainer-foreground'
                    : 'bg-muted text-muted-foreground'
                "
              >
                <Icon :icon="item.icon" class="w-8 h-8" />
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
          <SidebarMenuButton tooltip="Logout">
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
import { LogOut } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
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

const route = useRoute()

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
    title: 'Users',
    to: { name: 'admin.users' },
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
