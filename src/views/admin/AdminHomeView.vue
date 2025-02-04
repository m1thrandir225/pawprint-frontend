<script setup lang="ts">
import DefaultError from '@/components/Global/DefaultError.vue'
import DefaultLoader from '@/components/Global/DefaultLoader.vue'
import DefaultTitle from '@/components/Global/DefaultTitle.vue'
import { BarChart } from '@/components/ui/chart-bar'
import statisticsService from '@/services/statistics-service'
import { useQuery } from '@tanstack/vue-query'
import { Icon } from '@iconify/vue'

const { data, isLoading, isError, error } = useQuery({
  queryKey: ['statistics'],
  queryFn: statisticsService.getStatistics,
})
</script>

<template>
  <div class="flex flex-col items-start w-full gap-8">
    <DefaultTitle text="Dashboard" />
    <div class="grid w-full grid-cols-4 gap-4">
      <RouterLink
        :to="{ name: 'admin.pets' }"
        class="p-8 transition-opacity duration-100 ease-in-out border hover:opacity-75 hover:text-primary"
      >
        <Icon icon="lucide:dog" class="w-8 h-8" />
        <h1>Pets</h1>
      </RouterLink>
      <RouterLink
        :to="{ name: 'admin.adopters' }"
        class="p-8 transition-opacity duration-100 ease-in-out border hover:opacity-75 hover:text-primary"
      >
        <Icon icon="lucide:users" class="w-8 h-8" />
        <h1>Adopters</h1>
      </RouterLink>
      <RouterLink
        :to="{ name: 'admin.shelters' }"
        class="p-8 transition-opacity duration-100 ease-in-out border hover:opacity-75 hover:text-primary"
      >
        <Icon icon="lucide:house" class="w-8 h-8" />
        <h1>Shelters</h1>
      </RouterLink>
      <RouterLink
        :to="{ name: 'admin.roles' }"
        class="p-8 transition-opacity duration-100 ease-in-out border hover:opacity-75 hover:text-primary"
      >
        <Icon icon="carbon:user-role" class="w-8 h-8" />
        <h1>Roles</h1>
      </RouterLink>
    </div>
    <DefaultLoader v-if="isLoading" />
    <DefaultError v-else-if="isError" :error="error?.message" />
    <div v-else-if="data" class="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
      <div class="flex flex-col w-full gap-4 p-8 border bg-popover/20">
        <h1 class="text-xl font-semibold text-secondary font-generalSans">Adoptions</h1>
        <BarChart :categories="['total']" index="month" :data="data.adoption" />
        <p class="text-center font-generalSans text-foreground">
          Number of adoptions created per month
        </p>
      </div>

      <div class="flex flex-col w-full gap-4 p-8 border bg-popover/20">
        <h1 class="text-xl font-semibold text-secondary font-generalSans">Shelters</h1>
        <BarChart :categories="['total']" index="month" :data="data.shelter" />
        <p class="text-center font-generalSans text-foreground">
          Number of shelters registered per month
        </p>
      </div>
    </div>
  </div>
</template>
