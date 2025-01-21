<script setup lang="ts">
import DefaultContainer from '@/components/Global/DefaultContainer.vue'
import DefaultHeader from '@/components/Global/DefaultHeader.vue'
import PetGrid from '@/components/PetGrid.vue'
import { useQuery } from '@tanstack/vue-query'
import petSizesService from '@/services/petSizes-service'
import type { PetType } from '@/types/models/petType'
import type { PetSize } from '@/types/models/petSize'
import type { PetGender } from '@/types/models/petGender'
import AdoptionSearchForm from '@/components/AdoptionSearchForm.vue'
import petTypesService from '@/services/petTypes-service'
import petGendersService from '@/services/petGender-service'
import shelterListingService from '@/services/shelterListings-service'
import type { OwnerPetListing } from '@/types/models/ownerPetListing'
import ownerPetListingService from '@/services/ownerPetListing-service'
import { computed } from 'vue'

const {
  data: petTypeData,
  isPending: petTypeQueryIsPending,
  isError: petTypeQueryError,
} = useQuery<PetType[]>({
  queryKey: ['petTypes'],
  queryFn: petTypesService.getPetTypes,
  retry: 0,
})

const {
  data: petSizeData,
  isPending: petSizeQueryIsPending,
  isError: petSizeQueryError,
} = useQuery<PetSize[]>({
  queryKey: ['petSizes'],
  queryFn: petSizesService.getPetSizes,
  retry: 0,
})

const {
  data: petGenderData,
  isPending: petGenderQueryIsPending,
  isError: petGenderQueryError,
} = useQuery<PetGender[]>({
  queryKey: ['petGenders'],
  queryFn: petGendersService.getPetGenders,
  retry: 0,
})

const {
  data: shelterListingData,
  isPending: shelterListingQueryIsPending,
  isError: shelterListingQueryIsError,
} = useQuery({
  queryKey: ['shelterListings'],
  queryFn: shelterListingService.getShelterListings,
  retry: 0,
})

const {
  data: ownerListingData,
  isPending: ownerListingQueryIsPending,
  isError: ownerListingQueryIsError,
} = useQuery<OwnerPetListing[]>({
  queryKey: ['ownerListings'],
  queryFn: ownerPetListingService.getOwnerPetListings,
  retry: 0,
})

const allListings = computed(() => {
  if (!shelterListingData.value || !ownerListingData.value) {
    return []
  }
  return [...shelterListingData.value, ...ownerListingData.value]
})
</script>

<template>
  <DefaultContainer>
    <DefaultHeader />

    <AdoptionSearchForm
      :is-loading="petTypeQueryIsPending || petGenderQueryIsPending || petSizeQueryIsPending"
      :is-error="petTypeQueryError || petGenderQueryError || petSizeQueryError"
      :pet-gender-data="petGenderData"
      :pet-size-data="petSizeData"
      :pet-type-data="petTypeData"
    />
    <PetGrid
      :is-loading="shelterListingQueryIsPending || ownerListingQueryIsPending"
      :is-error="shelterListingQueryIsError || ownerListingQueryIsError"
      :listings="allListings"
    />
  </DefaultContainer>
</template>
