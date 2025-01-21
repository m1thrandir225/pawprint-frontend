<template>
  <div v-if="isPending"></div>
  <div v-else-if="isError"></div>
  <div v-else-if="data">
    <h1>Pet Details for : {{ JSON.stringify(data) }}</h1>
  </div>
</template>

<script setup lang="ts">
import shelterListingService from '@/services/shelterListings-service'
import type { ShelterPetListing } from '@/types/models/shelterPetListing'
import { useQuery } from '@tanstack/vue-query'
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
watch(route.params, () => {
  if (!route.params.id) {
    router.push({ name: 'notFound' })
  }
})

const { data, isPending, isError } = useQuery<ShelterPetListing>({
  queryKey: ['shelterListing', route.params.id],
  queryFn: ({ queryKey }) => shelterListingService.getShelterListing(queryKey[1] as string),
})
</script>

<style scoped></style>
