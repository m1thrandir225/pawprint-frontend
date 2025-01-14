<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  title: string
  description: string
  to: string
  card: 'shelter' | 'adopter'
}>()
</script>

<template>
  <RouterLink :to="to">
    <div
      class="w-full h-[350px] p-8 transition-all ease-in-out hover:opacity-75 rounded-2xl flex flex-col items-center justify-center gap-4 bg-primary/50 bg-blend-overlay bg-center bg-cover"
      :class="{
        'bg-shelterRegisterCard': card === 'shelter',
        'bg-userRegisterCard': card === 'adopter',
      }"
    >
      <h1 class="text-2xl font-semibold font-splieSans text-primary-foreground">
        {{ title }}
      </h1>
      <p class="text-lg text-center font-generalSans text-primary-foreground">
        {{ description }}
      </p>
    </div>
  </RouterLink>
</template>
