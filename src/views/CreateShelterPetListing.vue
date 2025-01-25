<script setup lang="ts">
import CreateForm from '@/components/CreateShelterPetListing/CreateForm.vue'
import DefaultContainer from '@/components/Global/DefaultContainer.vue'
import DefaultHeader from '@/components/Global/DefaultHeader.vue'
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
</script>

<template>
  <DefaultContainer>
    <DefaultHeader />
    <div v-if="petTypeQueryIsPending || petSizeQueryIsPending || petGenderQueryIsPending">
      <p>Loading...</p>
    </div>
    <div v-else-if="petTypeQueryError || petSizeQueryError || petGenderQueryError">
      <p>There was an error loading the data</p>
    </div>
    <CreateForm
      v-else-if="petGenderData && petTypeData && petSizeData"
      :types="petTypeData"
      :sizes="petSizeData"
      :genders="petGenderData"
    />
  </DefaultContainer>
</template>
