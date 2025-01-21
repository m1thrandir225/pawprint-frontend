<template>
  <div v-if="isPending"></div>
  <div v-else-if="isError"></div>
  <div v-else-if="data" class="py-4">
    <DefaultContainer>
      <DefaultHeader />
      <div class="grid w-full h-full grid-cols-3 gap-4">
        <div class="flex flex-col col-span-2 gap-4 p-4 border border-1 rounded-[16px]">
          <PetDetailsInfo :pet="data.pet" />
          <PetDetailsMedicalRecord :medicalRecord="data.medicalRecord" />
        </div>
        <div class="w-full h-full col-span-1">
          <div class="w-full h-auto border border-1 rounded-[16px] p-4">
            <PetDetailsShelter :shelter="data.shelter" />
            <Button class="w-full">
              <h1>Apply for adoption</h1>
            </Button>
          </div>
        </div>
      </div>
    </DefaultContainer>
  </div>
</template>

<script setup lang="ts">
import DefaultContainer from '@/components/Global/DefaultContainer.vue'
import DefaultHeader from '@/components/Global/DefaultHeader.vue'
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

const { data, isPending, isError } = useQuery<ShelterPetListing>({
  queryKey: ['shelterListing', route.params.id],
  queryFn: ({ queryKey }) => shelterListingService.getShelterListing(queryKey[1] as string),
})
</script>
