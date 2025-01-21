<template>
  <div v-if="isLoading" class="w-full h-full">
    <LoaderCircle class="animate-spin" />
  </div>
  <div v-else-if="isError">
    <p class="text-destructive">An error occured.</p>
  </div>
  <div v-else-if="listings" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <PetCard
      v-for="listing in listings"
      :key="listing.id"
      :pet="listing.pet"
      :listing-id="listing.id"
    />
  </div>
</template>

<script setup lang="ts">
import type { ShelterPetListing } from '@/types/models/shelterPetListing'
import { LoaderCircle } from 'lucide-vue-next'
import PetCard from './PetCard.vue'

defineProps<{
  isLoading: boolean
  isError: boolean
  listings: ShelterPetListing[] | undefined
}>()
</script>
