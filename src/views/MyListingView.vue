<template>
  <DefaultLoader v-if="isLoading" />
  <DefaultError v-else-if="isError && error" :error="error.message" />
  <DefaultError
    v-else-if="isAdoptionDataError && adoptionDataError"
    :error="adoptionDataError.message"
  />
  <div v-else-if="listing">
    <div class="flex flex-col w-full h-full gap-4">
      <ApprovedAdoptionForm
        :ref="approvedAdoptionFormRef"
        v-if="approvedAdoption"
        :adoption="approvedAdoption"
      />
      <div class="flex flex-col items-start col-span-2 gap-4 p-4 border rounded-lg border-1">
        <div class="flex flex-row items-center justify-between w-full">
          <DefaultBackButton />
          <Button as-child variant="link">
            <RouterLink :to="{ name: 'editMyListing', params: { id: listing.id } }">
              <span class="">Edit</span>
            </RouterLink>
          </Button>
        </div>
        <PetDetailsInfo :pet="listing.pet" />
        <AdoptionList
          v-if="adoptionData"
          :adoptions="adoptionData"
          @approve="approveAdoption"
          @reject="rejectAdoption"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultBackButton from '@/components/Global/DefaultBackButton.vue'
import DefaultError from '@/components/Global/DefaultError.vue'
import DefaultLoader from '@/components/Global/DefaultLoader.vue'
import AdoptionList from '@/components/MyListing/AdoptionList.vue'
import ApprovedAdoptionForm from '@/components/MyListing/ApprovedAdoptionForm.vue'
import PetDetailsInfo from '@/components/PetDetails/PetDetailsInfo.vue'
import { Button } from '@/components/ui/button'
import adoptionService from '@/services/adoption-service'
import ownerPetListingService from '@/services/ownerPetListing-service'
import shelterListingService from '@/services/shelterListings-service'
import useAuthStore from '@/stores/auth-store'
import type { Adoption } from '@/types/models/adoption'
import type { OwnerPetListing } from '@/types/models/ownerPetListing'
import type { ShelterPetListing } from '@/types/models/shelterPetListing'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, ref, type VNodeRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'

const authStore = useAuthStore()
const route = useRoute()
const queryClient = useQueryClient()
const approvedAdoptionFormRef = ref<VNodeRef | null>(null)

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

const approvedAdoption = computed(() => {
  return adoptionData?.value?.find((adoption) => adoption.approved === 0)
})

const {
  data: adoptionData,
  error: adoptionDataError,
  isError: isAdoptionDataError,
} = useQuery<Adoption[]>({
  queryKey: ['adoptionData', petId],
  queryFn: ({ queryKey }) => adoptionService.getAdoptionsForPet(queryKey[1] as string),

  enabled: enabled,
})

const { isPending: isUpdatingAdoption, mutateAsync: updateAdoption } = useMutation({
  mutationKey: ['updateAdoption', petId],
  mutationFn: (input: { id: string; approved: number }) =>
    adoptionService.updateAdoptionStatus(input),
  onSuccess: (data) => {
    queryClient
      .invalidateQueries({
        queryKey: ['adoptionData', data.pet.id],
      })
      .then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
  },
  onError: (error) => {
    toast.error(`Failed to update adoption request. Error + ${error.message}`)
  },
})

watch(
  () => isUpdatingAdoption,
  (newValue) => {
    if (newValue) {
      toast.loading('Updating adoption request...')
    }
  },
)

const approveAdoption = async (adoptionId: string) => {
  await updateAdoption({ approved: 0, id: adoptionId })
}

const rejectAdoption = async (adoptionId: string) => {
  await updateAdoption({ approved: 2, id: adoptionId })
}
</script>
