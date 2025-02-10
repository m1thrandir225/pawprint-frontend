<template>
  <div v-if="isError">
    <p v-if="error" class="text-destructive">Ther was an error with your request: {{ error }}</p>
    <p v-else class="text-destructive">Something went wrong</p>
  </div>
  <div v-else-if="isLoading" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <Skeleton v-for="index in 9" :key="index" class="w-full h-[367px] rounded-none" />
  </div>
  <div v-else-if="listings.length > 0" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <PetCard
      v-for="listing in listings"
      :key="listing.id"
      :pet="listing.pet"
      :listing-id="listing.id"
      :is-owner-listing="isOwnerPetListing(listing)"
    />
  </div>
  <div v-else>
    <p class="text-lg text-secondary font-splieSans">No listings found</p>
  </div>
</template>

<script setup lang="ts">
import type { ShelterPetListing } from '@/types/models/shelterPetListing'
import PetCard from './PetCard.vue'
import type { OwnerPetListing } from '@/types/models/ownerPetListing'
import { Skeleton } from './ui/skeleton'

defineProps<{
  isError: boolean
  isLoading: boolean
  error?: string
  listings: (OwnerPetListing | ShelterPetListing)[]
}>()

function isOwnerPetListing(item: ShelterPetListing | OwnerPetListing): item is OwnerPetListing {
  return 'surrenderReason' in item // Replace with an actual unique field of OwnerPetListing
}
</script>
