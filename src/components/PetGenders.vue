<script setup lang="ts">
import usePetGenderStore from '@/stores/petGender-store'

const store = usePetGenderStore()
store.fetchPetGenders()
</script>
<template>
  <div v-if="store.isLoading">Loading...</div>
  <div v-else-if="store.petGenders.length === 0">No pet types found</div>
  <div v-else>
    <div v-for="petType in store.petGenders" :key="petType.id">
      <p>{{ petType.name }}</p>
    </div>
  </div>
</template>
