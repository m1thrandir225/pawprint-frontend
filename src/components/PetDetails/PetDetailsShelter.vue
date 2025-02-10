<template>
  <div class="flex flex-col items-start w-full gap-4 font-generalSans text-foreground">
    <h1 class="text-lg font-bold font-splieSans text-foreground">Shelter information:</h1>
    <h1 class="w-full text-xl font-medium prose truncate text-foreground font-splieSans">
      {{ shelter.name }}
    </h1>
    <PetDetailsMap />
    <div class="flex items-center w-full space-x-4">
      <MapPinHouse class="text-secondary" />
      <p class="font-generalSans text-[16px]">
        <span class="font-semibold text-secondary">Address: </span>
        <span class="ml-2 text-foreground">{{ shelter.address }}</span>
      </p>
    </div>
    <div class="flex items-center w-full space-x-4">
      <PackageOpen class="text-secondary" />
      <p class="font-generalSans text-[16px]">
        <span class="font-semibold text-secondary">Capacity: </span>
        <span class="ml-2 text-foreground">{{ shelter.capacity }}</span>
      </p>
    </div>
    <div class="flex items-center w-full space-x-4">
      <Send class="text-secondary" />
      <p class="font-generalSans text-[16px] truncate">
        <span class="font-semibold text-secondary">E-Mail: </span>
        <span class="ml-2 text-foreground">{{ shelter.email }}</span>
      </p>
    </div>
    <div class="flex items-center w-full space-x-4" v-if="shelter.phoneNumber !== null">
      <Phone class="text-secondary" />
      <p class="font-generalSans text-[16px]">
        <span class="font-semibold text-secondary">Phone Number: </span>
        <span class="ml-2 text-foreground">{{ shelter.phoneNumber }}</span>
      </p>
    </div>
    <div class="flex items-center w-full space-x-4">
      <PowerOff class="text-secondary" />
      <p class="font-generalSans text-[16px]">
        <span class="font-semibold text-secondary">Is a no kill shelter: </span>
        <span class="ml-2 text-foreground">{{ booleanToText(shelter.isNoKill) }}</span>
      </p>
    </div>
    <div
      class="flex items-center w-full space-x-4"
      v-if="shelter.website !== null && shelter.website !== ''"
    >
      <Globe class="text-secondary" />
      <p class="font-generalSans text-[16px] prose truncate">
        <span class="font-semibold text-secondary">Website: </span>
        <span class="ml-2 text-foreground">{{ shelter.website }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Shelter } from '@/types/models/shelter'
import PetDetailsMap from './PetDetailsMap.vue'
import { Globe, MapPinHouse, PackageOpen, Phone, PowerOff, Send } from 'lucide-vue-next'
import { booleanToText } from '@/lib/utils'

defineProps<{
  shelter: Shelter
}>()
</script>
