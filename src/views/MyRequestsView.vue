<template>
  <DefaultTitle text="My Requests" />
  <DefaultLoader v-if="isPending" />
  <DefaultError v-else-if="isError" :error="error?.message" />
  <ScrollArea v-else-if="data" class="w-full h-[650px] my-4">
    <div
      v-for="adoption in data"
      :key="adoption.id"
      class="flex flex-row items-center justify-between p-4 my-4 rounded-lg bg-primaryContainer text-primaryContainer-foreground font-generalSans"
    >
      <div class="flex flex-col items-start gap-2">
        <p class="text-lg font-bold">{{ adoption.pet.name }}</p>
        <p class="text-[16px]">{{ adoption.pet.breed }}</p>
      </div>
      <div class="flex flex-row items-center gap-4">
        <p class="text-[16px] font-bold">{{ Approved[adoption.approved] }}</p>
        <Dialog>
          <DialogTrigger as-child>
            <Button>
              <Eye class="w-6 h-6" />
              <span> Details </span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle class="text-xl"> Adoption Details: {{ adoption.pet.name }} </DialogTitle>
              <DialogDescription>
                Breed: {{ adoption.pet.breed }}, Age: {{ adoption.pet.ageYears }}
              </DialogDescription>
            </DialogHeader>
            <div class="flex flex-col items-start gap-4">
              <p class="text-[16px] font-bold">
                Current Status: <span class="text-primary">{{ Approved[adoption.approved] }}</span>
              </p>
              <p class="text-[16px]">Counselor Notes: {{ adoption.counselorNotes ?? '/' }}</p>
              <p class="text-[16px">Follow Up Date: {{ adoption.followUpDate ?? 'TBA' }}</p>
              <p class="text-[16px">To take home date: {{ adoption.adoptionDate ?? 'TBA' }}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </ScrollArea>
</template>

<script setup lang="ts">
import DefaultError from '@/components/Global/DefaultError.vue'
import DefaultLoader from '@/components/Global/DefaultLoader.vue'
import DefaultTitle from '@/components/Global/DefaultTitle.vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import adoptionService from '@/services/adoption-service'
import useAuthStore from '@/stores/auth-store'
import { Approved, type Adoption } from '@/types/models/adoption'
import { useQuery } from '@tanstack/vue-query'
import { Eye } from 'lucide-vue-next'

const authStore = useAuthStore()

const { data, isPending, isError, error } = useQuery<Adoption[]>({
  queryKey: ['myRequests', authStore.user?.id],
  queryFn: ({ queryKey }) => adoptionService.getAdoptionsForUser(queryKey[1] as string),
  retry: 0,
})
</script>
