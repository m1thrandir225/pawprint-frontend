<template>
  <div
    class="flex flex-col items-start justify-start gap-8 p-4 my-8 rounded-lg md:justify-between md:items-center md:flex-row bg-primaryContainer"
  >
    <RouterLink
      :to="{ name: 'home' }"
      class="flex flex-row items-center justify-center w-auto gap-4 transition-opacity duration-100 ease-in-out hover:opacity-75"
    >
      <DefaultLogo class="h-[40px] w-auto" />
      <h1 class="text-2xl font-bold font-balooBahijaan text-primary">PawPrint</h1>
    </RouterLink>
    <p class="hidden font-generalSans md:block">© 2025 PawPrint. All rights reserved.</p>
    <RouterLink to="https://github.com/m1thrandir225/pawprint" class="flex flex-row gap-2">
      <Github class="w-6 h-6" />
      <p>Github</p>
    </RouterLink>
    <p class="block font-generalSans md:hidden">© 2025 PawPrint. All rights reserved.</p>
  </div>
</template>

<script setup lang="ts">
import { Github } from 'lucide-vue-next'
import DefaultLogo from './DefaultLogo.vue'
</script>

<style scoped></style>
