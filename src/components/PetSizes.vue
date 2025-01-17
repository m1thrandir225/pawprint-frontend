<script setup lang="ts">
import usePetSizeStore from '@/stores/petSize-store'

const store = usePetSizeStore()
store.fetchPetSizes()
</script>
<template>
  <div v-if="store.isLoading">Loading...</div>
  <div v-else-if="store.petSizes.length === 0">No pet types found</div>
  <div v-else>
    <div v-for="petType in store.petSizes" :key="petType.id">
      <p>{{ petType.name }}</p>
    </div>
  </div>
</template>
