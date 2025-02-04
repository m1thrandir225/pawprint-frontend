<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(crumb, index) in crumbs" :key="index">
        <BreadcrumbItem class="hidden md:block" v-if="crumb.to !== route.path">
          <BreadcrumbLink as-child>
            <RouterLink :to="crumb.to">{{ crumb.label }}</RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="index < crumbs.length - 1" class="hidden md:block" />
      </template>
      <BreadcrumbItem>
        <BreadcrumbPage>{{ currentPage }}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'

const route = useRoute()

const crumbs = computed(() => {
  const paths = route.path.split('/').filter((crumb) => crumb !== '')
  return paths.map((path, index) => {
    return {
      to: `/${paths.slice(0, index + 1).join('/')}`,
      label: path.charAt(0).toUpperCase() + path.slice(1),
    }
  })
})

const currentPage = computed(() => {
  const pathSegment = route.path.split('/').pop() ?? 'Current'
  return pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1)
})
</script>
