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
        <Button class="w-full">
          <h1>Apply for adoption</h1>
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
import ownerPetListingService from '@/services/ownerPetListing-service'
import type { OwnerPetListing } from '@/types/models/ownerPetListing'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'

const route = useRoute()

const { data, isPending, isError, error } = useQuery<OwnerPetListing>({
  queryKey: ['ownerPetListings', route.params.id],
  queryFn: ({ queryKey }) => ownerPetListingService.getOwnerPetListing(queryKey[1] as string),
  retry: 0,
})
</script>
