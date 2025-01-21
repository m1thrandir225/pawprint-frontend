<template>
  <div v-if="isPending"></div>
  <div v-else-if="isError"></div>
  <div v-else-if="data" class="py-4">
    <DefaultContainer>
      <DefaultHeader />
      <div class="grid w-full h-full grid-cols-3 gap-4">
        <div class="flex flex-col items-start col-span-2 gap-4 p-4 border border-1">
          <DefaultBackButton />
          <PetDetailsInfo :pet="data.pet" />
          <PetDetailsSurrenderReasons :surrenderReason="data.surrenderReason" />
          <PetDetailsOwnerDocuments :documents="data.ownerPetListingDocuments" />
        </div>
        <div class="w-full h-full col-span-1">
          <div class="flex flex-col items-start w-full h-auto gap-4 p-4 border border-1">
            <PetDetailsOwner :owner="data.adopter" />
            <Button class="w-full">
              <h1>Apply for adoption</h1>
            </Button>
          </div>
        </div>
      </div>
    </DefaultContainer>
  </div>
</template>

<script setup lang="ts">
import DefaultBackButton from '@/components/Global/DefaultBackButton.vue'
import DefaultContainer from '@/components/Global/DefaultContainer.vue'
import DefaultHeader from '@/components/Global/DefaultHeader.vue'
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

const { data, isPending, isError } = useQuery<OwnerPetListing>({
  queryKey: ['ownerPetListings', route.params.id],
  queryFn: ({ queryKey }) => ownerPetListingService.getOwnerPetListing(queryKey[1] as string),
  retry: 0,
})
</script>
