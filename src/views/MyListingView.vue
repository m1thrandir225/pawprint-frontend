<template>
  <DefaultContainer>
    <DefaultHeader />
    <DefaultLoader v-if="isLoading" />
    <DefaultError v-else-if="isError && error" :error="error.message" />
    <DefaultError
      v-else-if="isAdoptionDataError && adoptionDataError"
      :error="adoptionDataError.message"
    />
    <div v-else-if="listing">
      <div class="flex flex-col items-start col-span-2 gap-4 p-4 border border-1">
        <div class="flex flex-row items-center justify-between w-full">
          <DefaultBackButton />
          <Button as-child variant="link">
            <RouterLink :to="{ name: 'editMyListing', params: { id: listing.id } }">
              <span class="">Edit</span>
            </RouterLink>
          </Button>
        </div>
        <PetDetailsInfo :pet="listing.pet" />
        <AdoptionList v-if="adoptionData" :adoptions="adoptionData" />
      </div>
    </div>
  </DefaultContainer>
</template>

<script setup lang="ts">
import DefaultBackButton from '@/components/Global/DefaultBackButton.vue'
import DefaultContainer from '@/components/Global/DefaultContainer.vue'
import DefaultError from '@/components/Global/DefaultError.vue'
import DefaultHeader from '@/components/Global/DefaultHeader.vue'
import DefaultLoader from '@/components/Global/DefaultLoader.vue'
import AdoptionList from '@/components/MyListing/AdoptionList.vue'
import PetDetailsInfo from '@/components/PetDetails/PetDetailsInfo.vue'
import { Button } from '@/components/ui/button'
import adoptionService from '@/services/adoption-service'
import ownerPetListingService from '@/services/ownerPetListing-service'
import shelterListingService from '@/services/shelterListings-service'
import useAuthStore from '@/stores/auth-store'
import type { Adoption } from '@/types/models/adoption'
import type { OwnerPetListing } from '@/types/models/ownerPetListing'
import type { ShelterPetListing } from '@/types/models/shelterPetListing'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const authStore = useAuthStore()

const {
  data: listing,
  isLoading,
  error,
  isError,
} = useQuery<ShelterPetListing | OwnerPetListing>({
  queryKey: ['listing', route.params.id],
  queryFn: ({ queryKey }) => {
    if (authStore.userType == 'shelter') {
      return shelterListingService.getShelterListing(queryKey[1] as string)
    } else if (authStore.userType == 'user') {
      return ownerPetListingService.getOwnerPetListing(queryKey[1] as string)
    } else throw new Error('Invalid user type')
  },
})

const petId = computed(() => listing.value?.petId)
const enabled = computed(() => !!listing.value?.petId)

const {
  data: adoptionData,

  error: adoptionDataError,
  isError: isAdoptionDataError,
} = useQuery<Adoption[]>({
  queryKey: ['adoptionData', petId],
  queryFn: ({ queryKey }) => adoptionService.getAdoptionsForPet(queryKey[1] as string),

  enabled: enabled,
})
</script>
