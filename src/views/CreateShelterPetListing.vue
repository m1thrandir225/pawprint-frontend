<script setup lang="ts">
import CreateForm from '@/components/CreateShelterPetListing/CreateForm.vue'
import DefaultError from '@/components/Global/DefaultError.vue'
import DefaultLoader from '@/components/Global/DefaultLoader.vue'
import petGendersService from '@/services/petGender-service'
import petSizesService from '@/services/petSizes-service'
import petTypesService from '@/services/petTypes-service'
import type { PetGender } from '@/types/models/petGender'
import type { PetSize } from '@/types/models/petSize'
import type { PetType } from '@/types/models/petType'
import { useQuery } from '@tanstack/vue-query'

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
</script>

<template>
  <DefaultLoader v-if="petTypeQueryIsPending || petSizeQueryIsPending || petGenderQueryIsPending" />
  <DefaultError
    v-else-if="petTypeQueryIsError || petSizeQueryIsError || petGenderQueryIsError"
    :error="
      petTypeQueryError?.message || petSizeQueryError?.message || petGenderQueryError?.message
    "
  />
  <CreateForm
    v-else-if="petGenderData && petTypeData && petSizeData"
    :types="petTypeData"
    :sizes="petSizeData"
    :genders="petGenderData"
  />
</template>
