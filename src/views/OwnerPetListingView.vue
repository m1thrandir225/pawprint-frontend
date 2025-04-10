<template>
  <DefaultLoader v-if="isPending" />
  <DefaultError v-else-if="isError" :error="error?.message" />
  <div v-else-if="data" class="grid w-full h-full grid-cols-3 gap-4 py-4">
    <div class="flex flex-col items-start col-span-2 gap-4 p-4 border rounded-lg border-1">
      <DefaultBackButton />
      <PetDetailsInfo :pet="data.pet" />
      <PetDetailsSurrenderReasons :surrenderReason="data.surrenderReason" />
      <PetDetailsOwnerDocuments :documents="data.ownerPetListingDocuments" />
    </div>
    <div class="w-full h-full col-span-1">
      <div class="flex flex-col items-start w-full h-auto gap-4 p-4 border rounded-lg border-1">
        <PetDetailsOwner :owner="data.adopter" />
        <div class="flex flex-row items-center gap-4">
          <div class="flex items-center gap-2 text-secondary">
            <CircleDollarSign class="w-6 h-6" />
            <span class="text-lg font-bold text-secondary">Fee:</span>
          </div>
          <p>{{ data.adoptionFee }}</p>
        </div>
        <Button
          class="w-full"
          v-if="!ownedByUser"
          :disabled="adoptionMutationPending"
          @click="mutateAsync"
        >
          <Loader2 v-if="adoptionMutationPending" class="animate-spin" />
          <span v-else>Apply for adoption</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultBackButton from '@/components/Global/DefaultBackButton.vue'
import DefaultError from '@/components/Global/DefaultError.vue'
import DefaultLoader from '@/components/Global/DefaultLoader.vue'
import PetDetailsInfo from '@/components/PetDetails/PetDetailsInfo.vue'
import PetDetailsOwner from '@/components/PetDetails/PetDetailsOwner.vue'
import PetDetailsOwnerDocuments from '@/components/PetDetails/PetDetailsOwnerDocuments.vue'
import PetDetailsSurrenderReasons from '@/components/PetDetails/PetDetailsSurrenderReasons.vue'
import { Button } from '@/components/ui/button'
import adoptionService from '@/services/adoption-service'
import ownerPetListingService from '@/services/ownerPetListing-service'
import useAuthStore from '@/stores/auth-store'
import type { OwnerPetListing } from '@/types/models/ownerPetListing'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const { data, isPending, isError, error } = useQuery<OwnerPetListing>({
  queryKey: ['ownerPetListings', route.params.id],
  queryFn: ({ queryKey }) => ownerPetListingService.getOwnerPetListing(queryKey[1] as string),
  retry: 0,
})

const ownedByUser = computed(() => {
  return data?.value?.adopter.id === authStore.user?.id
})

const { isPending: adoptionMutationPending, mutateAsync } = useMutation({
  mutationKey: ['applyForAdoption', data?.value?.pet.id],
  mutationFn: () => adoptionService.createAdoption(data?.value?.pet.id as string),
  onSuccess: () => {
    router.push({ name: 'myRequests' })
  },
  onError: (error) => {
    toast.error(error.message)
  },
})
</script>
