<template>
  <div v-if="isError">
    <p v-if="error" class="text-destructive">Ther was an error with your request: {{ error }}</p>
    <p v-else class="text-destructive">Something went wrong</p>
  </div>
  <div v-else-if="isLoading" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <Skeleton v-for="index in 9" :key="index" class="w-full h-[367px] rounded-none" />
  </div>
  <div v-else-if="listings.length > 0" class="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
    <PetListingItem
      v-for="listing in listings"
      :key="listing.id"
      :item="listing"
      :refetch="refetch"
    />
  </div>
  <div v-else>
    <p class="text-lg text-secondary font-splieSans">No listings found</p>
  </div>
</template>

<script setup lang="ts">
import type { ShelterPetListing } from '@/types/models/shelterPetListing'
import PetListingItem from './PetListingItem.vue'
import type { OwnerPetListing } from '@/types/models/ownerPetListing'
import { Skeleton } from '../ui/skeleton'

defineProps<{
  isLoading: boolean
  isError: boolean
  error?: string
  listings: ShelterPetListing[] | OwnerPetListing[]
  refetch: () => void
}>()
</script>

<style scoped></style>
