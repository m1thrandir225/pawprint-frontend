<script setup lang="ts">
import { RouterView } from 'vue-router'
import DefaultHeader from '@/components/ui/DefaultHeader.vue'
</script>

<template>
  <div class="w-full min-h-dvh">
    <DefaultHeader />
    <RouterView />
  </div>
</template>
