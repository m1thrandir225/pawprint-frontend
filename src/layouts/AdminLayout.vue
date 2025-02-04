<template>
  <SidebarProvider :default-open="false">
    <AdminSidebar />
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b"
      >
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="h-4 mr-2" />
          <AdminBreadcrumb />
        </div>
      </header>
      <div class="flex flex-col flex-1 gap-4 p-4">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
import AdminSidebar from '@/components/Admin/AdminSidebar.vue'
import AdminBreadcrumb from '@/views/admin/AdminBreadcrumb.vue'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
</script>
