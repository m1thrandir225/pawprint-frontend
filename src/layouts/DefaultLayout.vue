<template>
  <DefaultContainer>
    <DefaultHeader />
    <slot />
  </DefaultContainer>
</template>

<script setup lang="ts">
import DefaultContainer from '@/components/Global/DefaultContainer.vue'
import DefaultHeader from '@/components/Global/DefaultHeader.vue'
</script>
