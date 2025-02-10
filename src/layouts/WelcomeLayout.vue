<template>
  <DefaultContainer class="flex flex-col gap-4">
    <WelcomeHeader />
    <slot />
    <DefaultFooter />
  </DefaultContainer>
</template>

<script setup lang="ts">
import DefaultContainer from '@/components/Global/DefaultContainer.vue'
import DefaultFooter from '@/components/Global/DefaultFooter.vue'
import WelcomeHeader from '@/components/Welcome/WelcomeHeader.vue'
</script>

<style scoped></style>
