<script setup lang="ts">
import DataTable from '@/components/DataTable/DataTable.vue'
import DefaultError from '@/components/Global/DefaultError.vue'
import DefaultLoader from '@/components/Global/DefaultLoader.vue'
import DefaultTitle from '@/components/Global/DefaultTitle.vue'
import usersService from '@/services/users-service'
import type { ShelterDTO } from '@/types/dto/ShelterDTO'
import { useQuery } from '@tanstack/vue-query'
import { columns } from './columns'

const { data, isLoading, isError, error } = useQuery<ShelterDTO[]>({
  queryKey: ['shelters'],
  queryFn: usersService.getShelters,
})
</script>

<template>
  <div class="flex flex-row items-center justify-between">
    <DefaultTitle text="Shelters" />
  </div>
  <DefaultLoader v-if="isLoading" />
  <DefaultError v-else-if="isError" :error="error?.message" />
  <DataTable
    v-else-if="data"
    :data="data"
    :columns="columns"
    class="max-w-full"
    searchable-column="name"
    search-placeholder="Filter Shelters..."
  />
</template>
