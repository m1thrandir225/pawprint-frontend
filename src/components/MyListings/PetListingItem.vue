<template>
  <Card class="w-full border rounded-lg border-outline">
    <CardHeader>
      <img
        :src="constructImageUrl(item.pet.avatarImg)"
        :alt="item.pet.name"
        class="w-full h-auto max-h-[250px] object-cover rounded-md"
      />
      <div class="flex flex-row items-center justify-between w-full">
        <div class="flex flex-col items-start gap-2">
          <CardTitle>
            {{ item.pet.name }}
          </CardTitle>
          <CardDescription> {{ item.pet.petType.name }} {{ item.pet.breed }} </CardDescription>
        </div>
        <div class="flex flex-row items-center gap-2">
          <Button as-child variant="default">
            <RouterLink :to="{ name: 'myListing', params: { id: props.item.id } }">
              <span class="sr-only"> Adoptions </span>
              <Eye class="w-6 h-6" />
            </RouterLink>
          </Button>
          <Button as-child variant="secondary">
            <RouterLink
              :to="{
                name: listingType == 'owner' ? 'editListing.user' : 'editListing.shelter',
                params: { id: props.item.id },
              }"
            >
              <span class="sr-only"> Edit </span>
              <Edit2 class="w-6 h-6" />
            </RouterLink>
          </Button>
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="destructive">
                <span class="sr-only"> Delete </span>

                <Trash2 class="w-6 h-6" />
              </Button>
            </DialogTrigger>
            <DialogContent
              @interact-outside="
                (event) => {
                  const target = event.target as HTMLElement
                  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
                }
              "
            >
              <DialogHeader>
                <DialogTitle> Delete Listing </DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete the current listing ?</DialogDescription
                >
              </DialogHeader>
              <DialogFooter class="flex flex-row items-center justify-end gap-2">
                <DialogClose as-child>
                  <Button variant="destructive" @click="mutateAsync" :disabled="isPending">
                    <Loader2 v-if="isPending" class="w-6 h-6 animate-spin" />
                    <span v-else> Delete </span>
                  </Button>
                </DialogClose>

                <DialogClose as-child>
                  <Button variant="secondary"> Cancel </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </CardHeader>
  </Card>
</template>

<script setup lang="ts">
import type { OwnerPetListing } from '@/types/models/ownerPetListing'
import type { ShelterPetListing } from '@/types/models/shelterPetListing'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Edit2, Eye, Loader2, Trash2 } from 'lucide-vue-next'
import useAuthStore from '@/stores/auth-store'
import { useMutation } from '@tanstack/vue-query'
import shelterListingService from '@/services/shelterListings-service'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import ownerPetListingService from '@/services/ownerPetListing-service'
import { toast } from 'vue-sonner'
import { constructImageUrl } from '@/lib/utils'
import { computed } from 'vue'

const props = defineProps<{
  item: OwnerPetListing | ShelterPetListing
  refetch: () => void
}>()

const { userType, user } = useAuthStore()

const listingType = computed(() => {
  return props.item.hasOwnProperty('ownerId') ? 'owner' : 'shelter'
})

const { mutateAsync, isPending } = useMutation({
  mutationKey: ['deleteListing', props.item.id],
  mutationFn: () => {
    if (userType === 'shelter') {
      return shelterListingService.deleteShelterListing({
        id: props.item.id,
        userId: user!.id,
      })
    } else if (userType === 'user') {
      return ownerPetListingService.deleteOwnerPetListing({
        id: props.item.id,
        userId: user!.id,
      })
    } else {
      throw new Error('Invalid user type')
    }
  },
  onSuccess: ({}) => {
    toast.success('Listing deleted successfully')
    props.refetch()
  },
  onError: (error) => {
    toast.error("Couldn't delete listing: " + error.message)
  },
})
</script>
