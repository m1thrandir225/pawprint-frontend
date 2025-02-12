<template>
  <Carousel v-if="images" @init-api="(val) => (emblaMainApi = val)">
    <CarouselContent>
      <CarouselItem v-for="(image, index) in images" :key="image">
        <div class="p-1">
          <img
            :src="constructImageUrl(image)"
            :alt="index.toString()"
            class="w-full h-full max-h-[350px] object-scale-down"
          />
        </div>
      </CarouselItem>
    </CarouselContent>
  </Carousel>
  <Carousel class="relative w-full max-w-full" @init-api="(val) => (emblaThumbnailApi = val)">
    <CarouselContent class="flex gap-1 ml-0">
      <CarouselItem
        v-for="(image, index) in images"
        :key="index"
        class="pl-0 cursor-pointer basis-1/8"
        @click="onThumbClick(index)"
      >
        <div class="p-1" :class="index === selectedIndex ? '' : 'opacity-50'">
          <img
            :src="constructImageUrl(image)"
            :alt="index.toString()"
            class="object-cover w-[250px] h-[100px] object-center"
          />
        </div>
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>

<script setup lang="ts">
import { watchOnce } from '@vueuse/core'
import { ref } from 'vue'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '../ui/carousel'
import { constructImageUrl } from '@/lib/utils'

defineProps<{
  images: string[] | undefined
}>()

const emblaMainApi = ref<CarouselApi>()
const emblaThumbnailApi = ref<CarouselApi>()
const selectedIndex = ref(0)

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap()
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap())
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return
  emblaMainApi.value.scrollTo(index)
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return

  onSelect()
  emblaMainApi.on('select', onSelect)
  emblaMainApi.on('reInit', onSelect)
})
</script>
