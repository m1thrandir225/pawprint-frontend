<template>
  <DefaultLoader v-if="isPending" />
  <DefaultError v-else-if="isError" :error="error?.message" />
  <div v-else-if="data" class="grid w-full h-full grid-cols-3 gap-4 py-4">
    <div class="flex flex-col items-start col-span-2 gap-4 p-4 border rounded-lg border-1">
      <DefaultBackButton />
      <PetDetailsInfo :pet="data.pet" />
      <PetDetailsMedicalRecord :medicalRecord="data.medicalRecord" />
    </div>
    <div class="w-full h-full col-span-1">
      <div class="flex flex-col items-start w-full h-auto gap-4 p-4 border rounded-lg border-1">
        <PetDetailsShelter :shelter="data.shelter" />
        <Button class="w-full">
          <h1>Apply for adoption</h1>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultBackButton from '@/components/Global/DefaultBackButton.vue'
import DefaultError from '@/components/Global/DefaultError.vue'
import DefaultLoader from '@/components/Global/DefaultLoader.vue'
import PetDetailsInfo from '@/components/PetDetails/PetDetailsInfo.vue'
import PetDetailsMedicalRecord from '@/components/PetDetails/PetDetailsMedicalRecord.vue'
import PetDetailsShelter from '@/components/PetDetails/PetDetailsShelter.vue'
import { Button } from '@/components/ui/button'
import shelterListingService from '@/services/shelterListings-service'
import type { ShelterPetListing } from '@/types/models/shelterPetListing'
import { useQuery } from '@tanstack/vue-query'
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

watch(route.params, () => {
  if (!route.params.id) {
    router.push({ name: 'notFound' })
  }
})

const { data, isPending, isError, error } = useQuery<ShelterPetListing>({
  queryKey: ['shelterListing', route.params.id],
  queryFn: ({ queryKey }) => shelterListingService.getShelterListing(queryKey[1] as string),
})
</script>
