<template>
  <DefaultLoader v-if="queries.isPending" />
  <DefaultError v-else-if="queries.isError" :error="queries.error?.error?.message" />
  <CreateOwnerListingForm
    v-else-if="
      queries.data.healthStatuses &&
      queries.data.petTypes &&
      queries.data.petSizes &&
      queries.data.petGenders &&
      queries.data.ownerSurrenderReasons
    "
    :types="queries.data.petTypes"
    :sizes="queries.data.petSizes"
    :genders="queries.data.petGenders"
    :healthStatuses="queries.data.healthStatuses"
    :ownerSurrenderReasons="queries.data.ownerSurrenderReasons"
  />
</template>

<script setup lang="ts">
import CreateOwnerListingForm from '@/components/CreatePetListing/CreateOwnerListingForm.vue'
import DefaultError from '@/components/Global/DefaultError.vue'
import DefaultLoader from '@/components/Global/DefaultLoader.vue'
import healthStatusService from '@/services/healthStatus-service'
import ownerSurrenderReasonService from '@/services/ownerSurrenderReason-service'
import petGendersService from '@/services/petGender-service'
import petSizesService from '@/services/petSizes-service'
import petTypesService from '@/services/petTypes-service'
import useAuthStore from '@/stores/auth-store'
import { useQueries } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'

const router = useRouter()

const authStore = useAuthStore()
if (authStore.userType === 'shelter') {
  router.replace({ name: 'createShelterListing' })
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
    {
      queryKey: ['ownerSurrenderReasons'],
      queryFn: ownerSurrenderReasonService.getOwnerSurrenderReasons,
    },
  ],
  combine: (result) => {
    return {
      data: {
        petTypes: result[0].data,
        petGenders: result[1].data,
        petSizes: result[2].data,
        healthStatuses: result[3].data,
        ownerSurrenderReasons: result[4].data,
      },
      isPending: result.some((r) => r.isPending),
      isError: result.find((r) => r.isError),
      error: result.find((r) => r.error),
    }
  },
})
</script>
