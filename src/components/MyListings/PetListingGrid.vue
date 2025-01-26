<template>
  <div class="w-full">
    <PetListingItem v-for="listing in listings" :key="listing.id" :item="listing" />
  </div>
</template>

<script setup lang="ts">
import type { ShelterPetListing } from '@/types/models/shelterPetListing'
import PetListingItem from './PetListingItem.vue'
import type { OwnerPetListing } from '@/types/models/ownerPetListing'

defineProps<{
  listings: ShelterPetListing[] | OwnerPetListing[]
}>()
</script>

<style scoped></style>
