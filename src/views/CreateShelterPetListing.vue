<script setup lang="ts">
import CreateForm from '@/components/CreatePetListing/CreateShelterListingForm.vue'
import DefaultError from '@/components/Global/DefaultError.vue'
import DefaultLoader from '@/components/Global/DefaultLoader.vue'
import healthStatusService from '@/services/healthStatus-service'
import petGendersService from '@/services/petGender-service'
import petSizesService from '@/services/petSizes-service'
import petTypesService from '@/services/petTypes-service'
import useAuthStore from '@/stores/auth-store'
import type { HealthStatus } from '@/types/models/healthStatus'
import type { PetGender } from '@/types/models/petGender'
import type { PetSize } from '@/types/models/petSize'
import type { PetType } from '@/types/models/petType'
import { useQuery } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'

const router = useRouter()

const authStore = useAuthStore()

if (authStore.userType === 'user') {
  router.replace({ name: 'createOwnerListing' })
}

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
  data: healthStatusData,
  isPending: healthStatusQueryIsPending,
  isError: healthStatusQueryIsError,
  error: healthStatusQueryError,
} = useQuery<HealthStatus[]>({
  queryKey: ['healthStatuses'],
  queryFn: healthStatusService.getHealthStatuses,
  retry: 0,
})
</script>

<template>
  <DefaultLoader
    v-if="
      petTypeQueryIsPending ||
      petSizeQueryIsPending ||
      petGenderQueryIsPending ||
      healthStatusQueryIsPending
    "
  />
  <DefaultError
    v-else-if="
      petTypeQueryIsError ||
      petSizeQueryIsError ||
      petGenderQueryIsError ||
      healthStatusQueryIsError
    "
    :error="
      petTypeQueryError?.message ||
      petSizeQueryError?.message ||
      petGenderQueryError?.message ||
      healthStatusQueryError?.message
    "
  />
  <CreateForm
    v-else-if="petGenderData && petTypeData && petSizeData && healthStatusData"
    :types="petTypeData"
    :sizes="petSizeData"
    :genders="petGenderData"
    :healthStatuses="healthStatusData"
  />
</template>
