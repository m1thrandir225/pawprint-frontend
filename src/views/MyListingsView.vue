<script setup lang="ts">
import DefaultContainer from '@/components/Global/DefaultContainer.vue'
import DefaultError from '@/components/Global/DefaultError.vue'
import DefaultHeader from '@/components/Global/DefaultHeader.vue'
import DefaultLodaer from '@/components/Global/DefaultLoader.vue'
import DefaultTitle from '@/components/Global/DefaultTitle.vue'
import ListingGrid from '@/components/MyListings/PetListingGrid.vue'
import { Button } from '@/components/ui/button'
import ownerPetListingService from '@/services/ownerPetListing-service'
import shelterListingService from '@/services/shelterListings-service'
import useAuthStore from '@/stores/auth-store'
import type { OwnerPetListing } from '@/types/models/ownerPetListing'
import type { ShelterPetListing } from '@/types/models/shelterPetListing'
import { useQuery } from '@tanstack/vue-query'
import { Plus } from 'lucide-vue-next'

const authStore = useAuthStore()

const {
  data: listings,
  error,
  isError,
  isPending,
  refetch,
} = useQuery<ShelterPetListing[] | OwnerPetListing[]>({
  queryKey: ['my-listings', authStore.userType],
  queryFn: () => {
    if (authStore.userType === 'shelter') {
      return shelterListingService.getListingsByShelter(authStore.user!.id)
    } else if (authStore.userType === 'user') {
      return ownerPetListingService.getListingsByOwner(authStore.user!.id)
    } else {
      throw new Error('Invalid user type')
    }
  },
})
</script>

<template>
  <DefaultContainer class="min-h-dvh">
    <DefaultHeader />
    <DefaultLodaer v-if="isPending" />
    <DefaultError v-else-if="isError" :error="error!.message" />
    <div v-else-if="listings" class="flex flex-col items-start w-full gap-8">
      <div class="flex flex-row items-center justify-between w-full">
        <DefaultTitle text="My Listings" />
        <Button as-child variant="default">
          <RouterLink :to="{ name: 'createShelterListing' }">
            <Plus class="w-6 h-6" />
            Create Listing
          </RouterLink>
        </Button>
      </div>
      <ListingGrid :listings="listings" :refetch="refetch" />
    </div>
  </DefaultContainer>
</template>
