<template>
  <div class="grid w-full grid-cols-1 sm:grid-cols-3">
    <PetListingItem
      v-for="listing in listings"
      :key="listing.id"
      :item="listing"
      :refetch="refetch"
    />
  </div>
</template>

<script setup lang="ts">
import type { ShelterPetListing } from '@/types/models/shelterPetListing'
import PetListingItem from './PetListingItem.vue'
import type { OwnerPetListing } from '@/types/models/ownerPetListing'

defineProps<{
  listings: ShelterPetListing[] | OwnerPetListing[]
  refetch: () => void
}>()
</script>

<style scoped></style>
