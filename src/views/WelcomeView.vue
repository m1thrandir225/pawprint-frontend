<script setup lang="ts">
import DefaultContainer from '@/components/Global/DefaultContainer.vue'
import DefaultHeader from '@/components/Global/DefaultHeader.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <DefaultContainer>
    <DefaultHeader />
    <h1>Welcome to pawprint</h1>
    <p>{{ route.fullPath }}</p>
  </DefaultContainer>
</template>
