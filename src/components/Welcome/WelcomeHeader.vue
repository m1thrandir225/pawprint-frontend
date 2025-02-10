<template>
  <div
    class="relative w-full h-full min-h-[150px] flex flex-row justify-between lg:justify-end items-center"
  >
    <RouterLink class="lg:hidden" :to="{ name: 'home' }">
      <DefaultLogo class="h-[80px] w-auto" />
    </RouterLink>
    <div class="absolute hidden -translate-x-1/2 lg:block left-1/2">
      <RouterLink
        :to="{ name: 'home' }"
        class="flex flex-row items-center justify-center w-auto gap-4 transition-opacity duration-100 ease-in-out hover:opacity-75"
      >
        <DefaultLogo class="h-[80px] w-auto" />
        <h1 class="text-4xl font-bold font-balooBahijaan text-primary">PawPrint</h1>
      </RouterLink>
    </div>
    <DefaultRouteLink to="/login" text="Login" class="relative z-20" />
    <ToggleDarkMode />
  </div>
</template>

<script setup lang="ts">
import DefaultLogo from '../Global/DefaultLogo.vue'
import DefaultRouteLink from '../Global/DefaultRouteLink.vue'
import ToggleDarkMode from '../ToggleDarkMode.vue'
</script>
