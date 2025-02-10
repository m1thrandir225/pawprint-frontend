<template>
  <div class="flex flex-row items-center justify-between w-full gap-4">
    <h1 class="text-4xl font-bold font-splieSans text-primary">{{ pet.name }}</h1>
    <div class="flex flex-row items-center gap-2 font-medium font-generalSans text-secondary">
      <p>{{ pet.petSize.name }}</p>
      <p>{{ pet.petGender.name }}</p>
      <p>{{ pet.petType.name }}</p>
    </div>
  </div>
  <PetDetailsImageShowcase :images="[pet.avatarImg, ...pet.imageShowcase]" />
  <Card class="w-full rounded-none border-secondary">
    <CardHeader>
      <CardTitle> Basic Information </CardTitle>
    </CardHeader>
    <CardContent class="grid grid-cols-2 gap-2">
      <div class="flex items-center w-full space-x-4">
        <PawPrint class="text-secondary" />
        <p class="font-generalSans text-[16px]">
          <span class="font-semibold text-secondary">Breed: </span>
          <span class="ml-2 text-foreground">{{ pet.breed }}</span>
        </p>
      </div>
      <div class="flex items-center w-full space-x-4">
        <BatteryMedium class="text-secondary" />
        <p class="font-generalSans text-[16px]">
          <span class="font-semibold text-secondary">Energy level: </span>
          <span class="ml-2 text-foreground">{{ pet.energyLevel }}</span>
        </p>
      </div>

      <div class="flex items-center w-full space-x-4">
        <Dog class="text-secondary" />
        <p class="font-generalSans text-[16px]">
          <span class="font-semibold text-secondary">Good with dogs: </span>
          <span class="ml-2 text-foreground">{{ booleanToText(pet.goodWithDogs) }}</span>
        </p>
      </div>
      <div class="flex items-center w-full space-x-4">
        <Calendar class="text-secondary" />
        <p class="font-generalSans text-[16px]">
          <span class="font-semibold text-secondary">Age: </span>
          <span class="ml-2 text-foreground">{{ pet.ageYears }} years</span>
        </p>
      </div>

      <div class="flex items-center w-full space-x-4">
        <Cat class="text-secondary" />
        <p class="font-generalSans text-[16px]">
          <span class="font-semibold text-secondary">Good with cats: </span>
          <span class="ml-2 text-foreground">{{ booleanToText(pet.goodWithCats) }}</span>
        </p>
      </div>
      <div class="flex items-center w-full space-x-4">
        <HeartPulse class="text-secondary" />
        <p class="font-generalSans text-[16px]">
          <span class="font-semibold text-secondary">Health status: </span>
          <span class="ml-2 text-foreground">{{ pet.healthStatus.name }}</span>
        </p>
      </div>
      <div class="flex items-center w-full space-x-4">
        <Baby class="text-secondary" />
        <p class="font-generalSans text-[16px]">
          <span class="font-semibold text-secondary">Good with children: </span>
          <span class="ml-2 text-foreground">{{ booleanToText(pet.goodWithChildren) }}</span>
        </p>
      </div>
      <div class="flex items-center w-full space-x-4">
        <HandHeart class="text-secondary" />
        <p class="font-generalSans text-[16px]">
          <span class="font-semibold text-secondary">Adoption status: </span>
          <span class="ml-2 text-foreground">{{ pet.adoptionStatus.name }}</span>
        </p>
      </div>
    </CardContent>
  </Card>

  <Card class="w-full rounded-none border-secondary">
    <CardHeader>
      <CardTitle class="flex items-center w-full gap-4">
        <ScrollText />
        Behavioral notes:
      </CardTitle>
      <CardDescription> </CardDescription>
    </CardHeader>
    <CardContent>
      <p class="font-generalSans text-[16px]" v-if="pet.behaviorialNotes">
        {{ pet.behaviorialNotes }}
      </p>
      <p v-else class="ml-2 text-gray-700">No special requirements.</p>
    </CardContent>
  </Card>
  <Card class="w-full rounded-none border-secondary">
    <CardHeader>
      <CardTitle class="flex items-center w-full gap-4">
        <Gem />
        Special requirements:
      </CardTitle>
      <CardDescription> </CardDescription>
    </CardHeader>
    <CardContent>
      <p class="font-generalSans text-[16px]" v-if="pet.specialRequirements">
        {{ pet.specialRequirements }}
      </p>
      <p v-else class="ml-2 text-gray-700">No special requirements.</p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { Pet } from '@/types/models/pet'
import PetDetailsImageShowcase from './PetDetailsImageShowcase.vue'
import {
  Baby,
  BatteryMedium,
  Cat,
  Dog,
  Gem,
  HandHeart,
  HeartPulse,
  PawPrint,
  ScrollText,
  Calendar,
} from 'lucide-vue-next'
import { booleanToText } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

defineProps<{
  pet: Pet
}>()
</script>
