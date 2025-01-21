<template>
  <RouterLink
    :to="{ name: 'listing', params: { id: listingId } }"
    class="w-full h-full p-4 transition-all duration-100 ease-in-out border border-outline hover:bg-primaryContainer group"
  >
    <img :src="pet.avatarImg" :alt="pet.name" class="object-cover w-full h-[250px]" />
    <div class="p-4">
      <h2 class="text-xl font-semibold text-primary group-hover:text-primaryContainer-foreground">
        {{ pet.name }}
      </h2>
      <p class="text-accent">{{ pet.breed }}</p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { Pet } from '@/types/models/pet'
import { RouterLink } from 'vue-router'

defineProps<{
  listingId: string
  pet: Pet
}>()
</script>
