<template>
  <div v-if="isError">
    <p v-if="error" class="text-destructive">Ther was an error with your request: {{ error }}</p>
    <p v-else class="text-destructive">Something went wrong</p>
  </div>
  <div v-else-if="listings" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <PetCard
      v-for="listing in listings"
      :key="listing.id"
      :pet="listing.pet"
      :listing-id="listing.id"
      :is-owner-listing="isOwnerPetListing(listing)"
    />
  </div>
</template>

<script setup lang="ts">
import type { ShelterPetListing } from '@/types/models/shelterPetListing'
import PetCard from './PetCard.vue'
import type { OwnerPetListing } from '@/types/models/ownerPetListing'

defineProps<{
  isError: boolean
  error?: string
  listings: (OwnerPetListing | ShelterPetListing)[]
}>()

function isOwnerPetListing(item: ShelterPetListing | OwnerPetListing): item is OwnerPetListing {
  return 'surrenderReason' in item // Replace with an actual unique field of OwnerPetListing
}
</script>
