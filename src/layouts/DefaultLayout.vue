<template>
  <DefaultContainer>
    <DefaultHeader />
    <slot />
    <DefaultFooter />
  </DefaultContainer>
</template>

<script setup lang="ts">
import DefaultContainer from '@/components/Global/DefaultContainer.vue'
import DefaultFooter from '@/components/Global/DefaultFooter.vue'
import DefaultHeader from '@/components/Global/DefaultHeader.vue'
</script>
