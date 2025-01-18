<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <PetCard v-for="pet in dummyPets" :key="pet.id" :pet="pet" />
  </div>
</template>

<script setup lang="ts">
import PetCard from './PetCard.vue'
import dummyPets from './pets'
</script>
