<script setup lang="ts">
import usePetTypeStore from '@/stores/petType-store'

const store = usePetTypeStore()

store.fetchPetTypes()
</script>
<template>
  <div v-if="store.isLoading">Loading...</div>
  <div v-else-if="store.petTypes.length === 0">No pet types found</div>
  <div v-else>
    <div v-for="petType in store.petTypes" :key="petType.id">
      <p>{{ petType.name }}</p>
    </div>
  </div>
</template>
