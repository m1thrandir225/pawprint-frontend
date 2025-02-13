<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 w-full lg:h-[500px] rounded-xl bg-primaryContainer">
    <div class="flex flex-col items-start justify-center gap-4 p-8">
      <h1 class="text-4xl font-bold text-center lg:text-6xl font-balooBahijaan lg:text-left">
        Your New Best Friend is Waiting
      </h1>
      <p
        class="text-lg text-center lg:text-2xl font-splieSans text-primaryContainer-foreground lg:text-left"
      >
        From wagging tails to gentle purrs, PawPrint is here to help you find the pet that's meant
        for you.
      </p>
      <p
        class="text-center lg:text-lg font-splieSans text-primaryContainer-foreground lg:text-left"
      >
        Explore our adoption listings and meet animals ready to fill your home with love and joy.
        Start your adoption journey now!
      </p>
    </div>
    <Vue3Lottie :animation-data="HeroLottie" />
  </div>

  <div class="flex flex-col w-full h-full gap-8 my-8">
    <h1 class="text-4xl font-bold text-center text-primary font-balooBahijaan">Register</h1>
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <RouterLink
        :to="{ name: 'register.adopter' }"
        class="h-[300px] registerCardAdopter text-primary-foreground p-4 rounded-lg flex flex-col items-center justify-center relative group"
      >
        <h1
          class="relative text-3xl font-medium transition-all duration-300 ease-in-out font-splieSans text-secondary top-20 group-hover:top-0"
        >
          As an adopter
        </h1>
        <Vue3Lottie
          :animation-data="AdopterLottie"
          :height="150"
          class="relative transition-all duration-300 ease-in-out opacity-0 top-20 group-hover:top-0 group-hover:opacity-100"
        />
      </RouterLink>
      <RouterLink
        :to="{ name: 'register.shelter' }"
        class="h-[300px] registerCard text-primary-foreground p-4 rounded-lg flex flex-col items-center justify-center relative group"
      >
        <h1
          class="relative text-3xl font-bold transition-all duration-300 ease-in-out font-splieSans text-secondary top-20 group-hover:top-0"
        >
          As a shelter
        </h1>
        <Vue3Lottie
          :animation-data="ShelterLottie"
          :height="150"
          class="relative transition-all duration-300 ease-in-out opacity-0 top-20 group-hover:top-0 group-hover:opacity-100"
        />
      </RouterLink>
    </div>
  </div>
  <div class="flex flex-col items-center gap-4 my-8">
    <h1 class="text-4xl font-bold text-center text-primary font-balooBahijaan">
      Checkout our sponsors
    </h1>
    <WelcomeSponsorCarousel />
  </div>
</template>

<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
import WelcomeSponsorCarousel from '@/components/Welcome/WelcomeSponsorCarousel.vue'

import AdopterLottie from '../assets/homeAdopterLottie.json'
import ShelterLottie from '../assets/homeShelterLottie.json'
import HeroLottie from '../assets/homeAlternativeLottie.json'
</script>

<style lang="css" scoped>
@keyframes moveIt {
  from {
    background-position: bottom left;
  }
  to {
    background-position: top right;
  }
}
.registerCard {
  background-color: #e0e0ff;
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23565992' fill-opacity='0.2'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: 261px;
}

.registerCard:hover {
  background-size: 261px;
  animation: moveIt 10s linear infinite;
}

.registerCardAdopter {
  background-color: #e0e0ff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23565992' fill-opacity='0.2'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: 261px;
}

.registerCardAdopter:hover {
  background-size: 261px;
  animation: moveIt 10s linear infinite;
}

.dark .registerCardAdopter {
  background-color: #444559;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23c5c4dd' fill-opacity='0.2'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.dark .registerCard {
  background-color: #444559;
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5c4dd' fill-opacity='0.2'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
