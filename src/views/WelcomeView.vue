<script setup lang="ts">
import DefaultContainer from '@/components/Global/DefaultContainer.vue'
import DefaultHeader from '@/components/Global/DefaultHeader.vue'
import PetGrid from '@/components/PetGrid.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <DefaultContainer>
    <DefaultHeader />
    <PetGrid />
  </DefaultContainer>
</template>
