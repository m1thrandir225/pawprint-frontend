<script setup lang="ts">
import CreateShelterListingForm from '@/components/CreatePetListing/CreateShelterListingForm.vue'
import DefaultError from '@/components/Global/DefaultError.vue'
import DefaultLoader from '@/components/Global/DefaultLoader.vue'
import healthStatusService from '@/services/healthStatus-service'
import petGendersService from '@/services/petGender-service'
import petSizesService from '@/services/petSizes-service'
import petTypesService from '@/services/petTypes-service'
import useAuthStore from '@/stores/auth-store'
import { useQueries } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'

const router = useRouter()

const authStore = useAuthStore()

if (authStore.userType === 'user') {
  router.replace({ name: 'createOwnerListing' })
}

const queries = useQueries({
  queries: [
    {
      queryKey: ['petTypes'],
      queryFn: petTypesService.getPetTypes,
    },
    {
      queryKey: ['petGenders'],
      queryFn: petGendersService.getPetGenders,
    },
    {
      queryKey: ['petSizes'],
      queryFn: petSizesService.getPetSizes,
    },
    {
      queryKey: ['healthStatuses'],
      queryFn: healthStatusService.getHealthStatuses,
    },
  ],
  combine: (result) => {
    return {
      data: {
        petTypes: result[0].data,
        petGenders: result[1].data,
        petSizes: result[2].data,
        healthStatuses: result[3].data,
      },
      isPending: result.some((r) => r.isPending),
      isError: result.find((r) => r.isError),
      error: result.find((r) => r.error),
    }
  },
})
</script>

<template>
  <DefaultLoader v-if="queries.isPending" />
  <DefaultError v-else-if="queries.isError" :error="queries.error?.error?.message" />
  <CreateShelterListingForm
    v-else-if="
      queries.data.healthStatuses &&
      queries.data.petTypes &&
      queries.data.petSizes &&
      queries.data.petGenders
    "
    :types="queries.data.petTypes"
    :sizes="queries.data.petSizes"
    :genders="queries.data.petGenders"
    :healthStatuses="queries.data.healthStatuses"
  />
</template>
