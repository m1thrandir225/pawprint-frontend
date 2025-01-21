<template>
  <div class="flex flex-col items-start w-full gap-4 font-generalSans text-foreground">
    <h1 class="text-lg font-bold font-splieSans text-foreground">Owner information:</h1>
    <h1 class="w-full text-xl font-medium prose truncate text-foreground font-splieSans">
      {{ owner.firstName }} {{ owner.lastName }}
    </h1>
    <div class="flex items-center w-full space-x-4">
      <MapPinHouse class="text-accent" />
      <p class="font-generalSans text-[16px]">
        <span class="font-semibold text-accent">Contact Email: </span>
        <span class="ml-2 text-foreground">{{ owner.email }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/models/user'
import { MapPinHouse } from 'lucide-vue-next'

defineProps<{
  owner: User
}>()
</script>
