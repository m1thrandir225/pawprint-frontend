<script setup lang="ts">
import AdoptionSearchForm from '@/components/AvaliableListingsView/AdoptionSearchForm.vue'
import PetGrid from '@/components/PetGrid.vue'
import ownerPetListingService from '@/services/ownerPetListing-service'
import petGendersService from '@/services/petGender-service'
import petSizesService from '@/services/petSizes-service'
import petTypesService from '@/services/petTypes-service'
import shelterListingService from '@/services/shelterListings-service'
import type { OwnerPetListing } from '@/types/models/ownerPetListing'
import type { PetGender } from '@/types/models/petGender'
import type { PetSize } from '@/types/models/petSize'
import type { PetType } from '@/types/models/petType'
import { useQuery } from '@tanstack/vue-query'
import { computed, reactive } from 'vue'

const searchParams = reactive({
  petGenderId: '',
  petSizeId: '',
  petTypeId: '',
  search: '',
})

const {
  data: petTypeData,
  isPending: petTypeQueryIsPending,
  isError: petTypeQueryIsError,
  error: petTypeQueryError,
} = useQuery<PetType[]>({
  queryKey: ['petTypes'],
  queryFn: petTypesService.getPetTypes,
  retry: 0,
})

const {
  data: petSizeData,
  isPending: petSizeQueryIsPending,
  isError: petSizeQueryIsError,
  error: petSizeQueryError,
} = useQuery<PetSize[]>({
  queryKey: ['petSizes'],
  queryFn: petSizesService.getPetSizes,
  retry: 0,
})

const {
  data: petGenderData,
  isPending: petGenderQueryIsPending,
  isError: petGenderQueryIsError,
  error: petGenderQueryError,
} = useQuery<PetGender[]>({
  queryKey: ['petGenders'],
  queryFn: petGendersService.getPetGenders,
  retry: 0,
})

const {
  data: shelterListingData,
  isPending: shelterListingQueryIsPending,
  isError: shelterListingQueryIsError,
  error: shelterListingQueryError,
} = useQuery({
  queryKey: ['shelterListings', searchParams],
  queryFn: () =>
    shelterListingService.getShelterListings({
      petGenderId: searchParams.petGenderId,
      petSizeId: searchParams.petSizeId,
      petTypeId: searchParams.petTypeId,
      search: searchParams.search,
    }),
  retry: 0,
})

const {
  data: ownerListingData,
  isPending: ownerListingQueryIsPending,
  isError: ownerListingQueryIsError,
  error: ownerListingQueryError,
} = useQuery<OwnerPetListing[]>({
  queryKey: ['ownerListings', searchParams],
  queryFn: () =>
    ownerPetListingService.getOwnerPetListings({
      petGenderId: searchParams.petGenderId,
      petSizeId: searchParams.petSizeId,
      petTypeId: searchParams.petTypeId,
      search: searchParams.search,
    }),
  retry: 0,
})

const allListings = computed(() => {
  if (!shelterListingData.value || !ownerListingData.value) {
    return []
  }
  return [...shelterListingData.value, ...ownerListingData.value]
})

const areFiltersLoading = computed(() => {
  return petTypeQueryIsPending.value || petGenderQueryIsPending.value || petSizeQueryIsPending.value
})

const areListingsLoading = computed(() => {
  return shelterListingQueryIsPending.value || ownerListingQueryIsPending.value
})

const handleSubmit = (formData: {
  petTypeId: string
  petGenderId: string
  petSizeId: string
  search: string
}) => {
  searchParams.petTypeId = formData.petTypeId === 'all' ? '' : formData.petTypeId
  searchParams.petGenderId = formData.petGenderId === 'all' ? '' : formData.petGenderId
  searchParams.petSizeId = formData.petSizeId === 'all' ? '' : formData.petSizeId
  searchParams.search = formData.search
}
</script>

<template>
  <AdoptionSearchForm
    :is-loading="areFiltersLoading"
    :is-error="petTypeQueryIsError || petGenderQueryIsError || petSizeQueryIsError"
    :error="
      petTypeQueryError?.message || petGenderQueryError?.message || petSizeQueryError?.message
    "
    :pet-gender-data="petGenderData"
    :pet-size-data="petSizeData"
    :pet-type-data="petTypeData"
    @submit="handleSubmit"
  />

  <PetGrid
    :is-error="shelterListingQueryIsError || ownerListingQueryIsError"
    :is-loading="areListingsLoading"
    :error="shelterListingQueryError?.message || ownerListingQueryError?.message"
    :listings="allListings"
  />
</template>
