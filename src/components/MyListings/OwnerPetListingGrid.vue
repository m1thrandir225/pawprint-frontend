<template>
  <div v-for="listing in listings" :key="listing.id">
    {{ listing.adopter.lastName }}
  </div>
</template>

<script setup lang="ts">
import type { OwnerPetListing } from '@/types/models/ownerPetListing'

defineProps<{
  listings: OwnerPetListing[]
}>()
</script>

<style scoped></style>
