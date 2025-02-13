<script setup lang="ts">
import type { Pet } from '@/types/models/pet'
import { columns } from './columns'
import DataTable from '../../DataTable/DataTable.vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import petService from '@/services/pet-service'
import DefaultTitle from '@/components/Global/DefaultTitle.vue'
import { Button } from '@/components/ui/button'
import { FileDown, Loader2 } from 'lucide-vue-next'
import DefaultLoader from '@/components/Global/DefaultLoader.vue'
import DefaultError from '@/components/Global/DefaultError.vue'

const { data, isLoading, isError, error } = useQuery<Pet[]>({
  queryKey: ['pets'],
  queryFn: petService.getPets,
})

const { mutateAsync, isPending } = useMutation({
  mutationKey: ['exportPets'],
  mutationFn: petService.exportPets,
  onSuccess: (data) => {
    // Create blob and download
    const blob = new Blob([data], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'pets.csv')
    document.body.appendChild(link)
    link.click()

    // Clean up
    link.parentNode?.removeChild(link)
    window.URL.revokeObjectURL(url)
  },
})
</script>

<template>
  <div class="flex flex-row items-center justify-between">
    <DefaultTitle text="Pets" />
    <Button variant="outline" @click="mutateAsync" :disabled="isPending">
      <template v-if="isPending">
        <Loader2 class="animate-spin" />
      </template>
      <template v-else>
        <FileDown class="w-6 h-6" />
        Export Data
      </template>
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
