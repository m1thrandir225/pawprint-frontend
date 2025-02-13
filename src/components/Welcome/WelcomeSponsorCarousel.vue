<template>
  <Carousel
    class="relative w-full max-w-[80%]"
    :opts="{
      align: 'start',
    }"
    :plugins="[
      Autoplay({
        delay: 10000,
      }),
    ]"
  >
    <CarouselContent class="px-4">
      <CarouselItem v-for="sponsor in sponsors" :key="sponsor.id" class="md:basis-1/2 lg:basis-1/3">
        <a v-if="sponsor.id !== 1" :href="sponsor.url" target="_blank" rel="noopener noreferrer">
          <div
            class="w-full h-full transition-all duration-100 ease-in-out border rounded-lg border-primary hover:opacity-75"
          >
            <img
              :src="sponsor.logo"
              alt="sponsor logo "
              class="object-contain w-full h-full rounded-lg"
            />
          </div>
        </a>
        <RouterLink
          v-else
          :to="sponsor.url"
          class="transition-opacity duration-100 ease-in-out hover:opacity-75"
        >
          <div
            class="flex items-center justify-center w-full h-full p-8 bg-white border rounded-lg border-primary"
          >
            <Icon icon="game-icons:food-truck" class="w-10 h-10 text-primary" />
            <h1 class="text-2xl font-bold font-splieSans text-primary">{{ sponsor.name }}</h1>
          </div>
        </RouterLink>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>

<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay'
import Sponsor1 from '../../assets/sponsor-1.jpg'
import Sponsor2 from '../../assets/sponsor-2.jpg'
import Sponsor3 from '../../assets/sponsor-3.jpg'
import Sponsor4 from '../../assets/sponsor-4.jpg'

import { Icon } from '@iconify/vue'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'

const sponsors = [
  {
    id: 1,
    name: 'Partner Delivery',
    logo: 'https://placehold.co/600x400',
    url: '/partner-app',
  },

  {
    id: 2,
    name: 'Purina',
    logo: Sponsor2,
    url: 'https://example.com',
  },
  {
    id: 3,
    name: 'The Lazy Dog',
    logo: Sponsor3,
    url: 'https://example.com',
  },
  {
    id: 4,
    name: "Maddie's Fund",
    logo: Sponsor4,
    url: 'https://example.com',
  },
  {
    id: 5,
    name: 'Petco',
    logo: Sponsor1,
    url: 'https://example.com',
  },
]
</script>
