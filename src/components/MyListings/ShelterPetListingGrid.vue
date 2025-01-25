<template>
  <div v-for="listing in listings" :key="listing.id">
    {{ listing.shelter.name }}
  </div>
</template>

<script setup lang="ts">
import type { ShelterPetListing } from '@/types/models/shelterPetListing'

defineProps<{
  listings: ShelterPetListing[]
}>()
</script>

<style scoped></style>
