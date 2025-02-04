<script setup lang="ts">
import DataTable from '@/components/DataTable/DataTable.vue'
import DefaultError from '@/components/Global/DefaultError.vue'
import DefaultLoader from '@/components/Global/DefaultLoader.vue'
import DefaultTitle from '@/components/Global/DefaultTitle.vue'
import usersService from '@/services/users-service'
import type { UserRole } from '@/types/models/userRole'
import { useQuery } from '@tanstack/vue-query'
import { columns } from './columns'

const { data, isLoading, isError, error } = useQuery<UserRole[]>({
  queryKey: ['userRoles'],
  queryFn: usersService.getUserRoles,
})
</script>

<template>
  <div class="flex flex-row items-center justify-between">
    <DefaultTitle text="User Roles" />
  </div>
  <DefaultLoader v-if="isLoading" />
  <DefaultError v-else-if="isError" :error="error?.message" />
  <DataTable
    v-else-if="data"
    :data="data"
    :columns="columns"
    class="max-w-full"
    searchable-column="name"
    search-placeholder="Filter Roles..."
  />
</template>
