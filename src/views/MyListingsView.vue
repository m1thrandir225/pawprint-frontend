<script setup lang="ts">
import DefaultTitle from '@/components/Global/DefaultTitle.vue'
import ListingGrid from '@/components/MyListings/PetListingGrid.vue'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import adoptionStatusService from '@/services/adoptionStatus-service'
import ownerPetListingService from '@/services/ownerPetListing-service'
import shelterListingService from '@/services/shelterListings-service'
import useAuthStore from '@/stores/auth-store'
import type { AdoptionStatus } from '@/types/models/adoptionStatus'
import type { OwnerPetListing } from '@/types/models/ownerPetListing'
import type { ShelterPetListing } from '@/types/models/shelterPetListing'
import { useQuery } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { Filter, Plus } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import * as z from 'zod'
const authStore = useAuthStore()

const adoptionStatusId = ref<string>('')

const {
  data: adoptionStatuses,
  isPending: adoptionStatusesIsPending,
  isError: adoptionStatusesIsError,
  error: adoptionStatusesError,
} = useQuery<AdoptionStatus[]>({
  queryKey: ['adoptionStatuses'],
  queryFn: () => adoptionStatusService.getAdoptionStatuses(),
})

const {
  data: listings,
  error,
  isError,
  isPending,
  refetch,
} = useQuery<ShelterPetListing[] | OwnerPetListing[]>({
  queryKey: ['my-listings', authStore.userType, adoptionStatusId.value],
  queryFn: () => {
    if (authStore.userType === 'shelter') {
      return shelterListingService.getListingsByShelter({
        shelterId: authStore.user!.id,
        adoptionStatusId: adoptionStatusId.value,
      })
    } else if (authStore.userType === 'user') {
      return ownerPetListingService.getListingsByOwner({
        adoptionStatusId: adoptionStatusId.value,
        ownerId: authStore.user!.id,
      })
    } else {
      throw new Error('Invalid user type')
    }
  },
  refetchOnMount: true,
})

const schema = toTypedSchema(
  z.object({
    adoptionStatusId: z.string(),
  }),
)

const form = useForm({
  validationSchema: schema,
  initialValues: {
    adoptionStatusId: '',
  },
})

const onSubmit = form.handleSubmit(async (values) => {
  console.log(values)
  adoptionStatusId.value = values.adoptionStatusId === 'all' ? '' : values.adoptionStatusId
  refetch()
})

const allListings = computed(() => {
  if (!listings.value) {
    return []
  }
  return listings.value
})
</script>

<template>
  <div v-if="adoptionStatusesIsPending" class="w-full h-12 rounded-lg">
    <Skeleton class="w-full h-12 rounded-none" />
  </div>
  <div v-else-if="adoptionStatusesIsError">
    <p class="text-destructive">Something went wrong: {{ adoptionStatusesError?.message }}</p>
  </div>
  <div v-else-if="adoptionStatuses" class="flex flex-col items-start w-full gap-8">
    <div class="flex flex-row items-center justify-between w-full">
      <DefaultTitle text="My Listings" />
      <Button as-child variant="default">
        <RouterLink
          :to="{
            name: authStore.userType === 'shelter' ? 'createShelterListing' : 'createOwnerListing',
          }"
        >
          <Plus class="w-6 h-6" />
          Create Listing
        </RouterLink>
      </Button>
    </div>
    <div class="flex flex-col items-start w-full h-full gap-4">
      <form @submit="onSubmit" class="flex flex-row items-center justify-between w-full">
        <FormField v-slot="{ componentField }" name="adoptionStatusId">
          <FormItem class="flex flex-row items-center justify-center gap-4">
            <FormLabel class="font-bold">Status</FormLabel>
            <Select v-if="adoptionStatuses" v-bind="componentField" default-value="all">
              <FormControl class="!mt-0">
                <SelectTrigger class="w-[150px]">
                  <SelectValue placeholder="Listing Status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all"> All </SelectItem>
                  <SelectItem
                    v-for="adoptionStatus in adoptionStatuses"
                    :key="adoptionStatus.id"
                    :value="adoptionStatus.id"
                    >{{ adoptionStatus.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" variant="secondary"> <Filter class="w-6 h-6" /> Filter </Button>
      </form>

      <ListingGrid
        :listings="allListings"
        :refetch="refetch"
        :is-error="isError"
        :is-loading="isPending"
        :error="error?.message"
      />
    </div>
  </div>
</template>
