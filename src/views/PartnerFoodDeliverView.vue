<template>
  <DefaultLoader v-if="isPending" />
  <DefaultError v-else-if="isError" :error="error?.message" />
  <div v-else-if="data" class="flex flex-col w-full h-full gap-4">
    <div class="flex flex-row items-center justify-between w-full">
      <DefaultTitle text="Our partner restaurants" />
      <Button variant="outline" as-child>
        <a href="https://fooddeliveryweb20250207201253.azurewebsites.net/" target="_blank">
          <LinkIcon class="w-6 h-6" />
          <span> Checkout their website </span>
        </a>
      </Button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="restaurant in data" :key="restaurant.image">
        <CardHeader>
          <img :src="restaurant.image" alt="restaurant" class="rounded-md" />
        </CardHeader>
        <CardContent>
          <div class="flex flex-row items-center justify-between">
            <h1 class="text-2xl font-bold">{{ restaurant.name }}</h1>
            <p><Star class="w-6 h-6" />{{ restaurant.rating }}/5</p>
          </div>
          <p>{{ restaurant.description }}</p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultError from '@/components/Global/DefaultError.vue'
import DefaultLoader from '@/components/Global/DefaultLoader.vue'
import DefaultTitle from '@/components/Global/DefaultTitle.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import partnerShopService from '@/services/partnerShop-service'
import type { Restaurant } from '@/types/models/restoraunt'
import { useQuery } from '@tanstack/vue-query'
import { LinkIcon, Star } from 'lucide-vue-next'

const { data, isPending, isError, error } = useQuery<Restaurant[]>({
  queryKey: ['partnerApp'],
  queryFn: partnerShopService.getResourants,
})
</script>

<style scoped></style>
