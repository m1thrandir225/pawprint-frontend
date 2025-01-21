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
  <Card class="w-full rounded-none border-accent">
    <CardHeader>
      <CardTitle> Basic Information </CardTitle>
    </CardHeader>
    <CardContent class="grid grid-cols-2 gap-2">
      <div class="flex items-center w-full space-x-4">
        <PawPrint class="text-accent" />
        <p class="font-generalSans text-[16px]">
          <span class="font-semibold text-accent">Breed: </span>
          <span class="ml-2 text-foreground">{{ pet.breed }}</span>
        </p>
      </div>
      <div class="flex items-center w-full space-x-4">
        <BatteryMedium class="text-accent" />
        <p class="font-generalSans text-[16px]">
          <span class="font-semibold text-accent">Energy level: </span>
          <span class="ml-2 text-foreground">{{ pet.energyLevel }}</span>
        </p>
      </div>

      <div class="flex items-center w-full space-x-4">
        <Dog class="text-accent" />
        <p class="font-generalSans text-[16px]">
          <span class="font-semibold text-accent">Good with dogs: </span>
          <span class="ml-2 text-foreground">{{
            capitalizeFirstLetter(pet.goodWithDogs.toString())
          }}</span>
        </p>
      </div>
      <div class="flex items-center w-full space-x-4">
        <Calendar class="text-accent" />
        <p class="font-generalSans text-[16px]">
          <span class="font-semibold text-accent">Age: </span>
          <span class="ml-2 text-gray-700">{{ pet.ageYears }} years</span>
        </p>
      </div>

      <div class="flex items-center w-full space-x-4">
        <Cat class="text-accent" />
        <p class="font-generalSans text-[16px]">
          <span class="font-semibold text-accent">Good with cats: </span>
          <span class="ml-2 text-foreground">{{
            capitalizeFirstLetter(pet.goodWithCats.toString())
          }}</span>
        </p>
      </div>
      <div class="flex items-center w-full space-x-4">
        <HeartPulse class="text-accent" />
        <p class="font-generalSans text-[16px]">
          <span class="font-semibold text-accent">Health status: </span>
          <span class="ml-2 text-gray-700">{{ pet.healthStatus.name }}</span>
        </p>
      </div>
      <div class="flex items-center w-full space-x-4">
        <Baby class="text-accent" />
        <p class="font-generalSans text-[16px]">
          <span class="font-semibold text-accent">Good with children: </span>
          <span class="ml-2 text-foreground">{{
            capitalizeFirstLetter(pet.goodWithChildren.toString())
          }}</span>
        </p>
      </div>
      <div class="flex items-center w-full space-x-4">
        <HandHeart class="text-accent" />
        <p class="font-generalSans text-[16px]">
          <span class="font-semibold text-accent">Adoption status: </span>
          <span class="ml-2 text-foreground">{{ pet.adoptionStatus.name }}</span>
        </p>
      </div>
    </CardContent>
  </Card>

  <Card class="w-full rounded-none border-accent">
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
  <Card class="w-full rounded-none border-accent">
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
import { capitalizeFirstLetter } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

defineProps<{
  pet: Pet
}>()
</script>
