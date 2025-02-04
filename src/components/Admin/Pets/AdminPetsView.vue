<script setup lang="ts">
import type { Pet } from '@/types/models/pet'
import { columns } from './columns'
import DataTable from '../../DataTable/DataTable.vue'
import { useQuery } from '@tanstack/vue-query'
import petService from '@/services/pet-service'
import DefaultTitle from '@/components/Global/DefaultTitle.vue'
import { Button } from '@/components/ui/button'
import { FileDown } from 'lucide-vue-next'
import DefaultLoader from '@/components/Global/DefaultLoader.vue'
import DefaultError from '@/components/Global/DefaultError.vue'

const { data, isLoading, isError, error } = useQuery<Pet[]>({
  queryKey: ['pets'],
  queryFn: petService.getPets,
})
</script>

<template>
  <div class="flex flex-row items-center justify-between">
    <DefaultTitle text="Pets" />
    <Button variant="outline">
      <FileDown class="w-6 h-6" />
      Export Data
    </Button>
  </div>
  <DefaultLoader v-if="isLoading" />
  <DefaultError v-else-if="isError" :error="error?.message" />
  <DataTable
    v-else-if="data"
    :columns="columns"
    :data="data"
    class="max-w-full"
    searchable-column="name"
    search-placeholder="Filter Pets..."
  />
</template>
