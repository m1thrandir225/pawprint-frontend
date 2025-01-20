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
import shelterListingService from '@/services/shelter-service'

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
  data: adoptionData,
  isPending: adoptionQueryIsPending,
  isError: adoptionQueryIsError,
} = useQuery({
  queryKey: ['shelterListings'],
  queryFn: shelterListingService.getShelterListings,
  retry: 0,
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
      :is-loading="adoptionQueryIsPending"
      :is-error="adoptionQueryIsError"
      :listings="adoptionData"
    />
  </DefaultContainer>
</template>
