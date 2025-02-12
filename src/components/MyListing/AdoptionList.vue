<template>
  <Card class="w-full rounded-none border-secondary">
    <CardHeader>
      <CardTitle>Adoptions</CardTitle>
      <CardDescription>All submissions for the pet.</CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col w-full gap-3">
      <Table v-if="adoptions.length > 0">
        <TableCaption> A list of submitted adoptions for the current pet </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Adopter Name</TableHead>
            <TableHead>Adoption Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="adoption in adoptions"
            :key="adoption.id"
            :class="{
              'bg-secondary/50 hover:bg-secondary/20 text-secondary-foreground hover:text-secondary':
                adoption.approved === 0,
              'bg-destructive/50 text-destructive-foreground': adoption.approved === 2,
            }"
          >
            <TableCell class="w-[90%]">
              {{ adoption.adopter.firstName }} {{ adoption.adopter.lastName }}</TableCell
            >
            <TableCell>
              <div class="flex flex-row items-center justify-center gap-4">
                <Button
                  variant="default"
                  v-if="!hasAnApprovedAdoptionRequest"
                  @click="() => $emit('approve', adoption.id)"
                >
                  <Check class="w-6 h-6 space-x-2" />
                  Approve
                </Button>
                <Dialog>
                  <DialogTrigger as-child>
                    <Button variant="default">
                      <ListCollapse class="w-6 h-6" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adoption details</DialogTitle>
                      <DialogDescription>
                        Information about the adoption request
                      </DialogDescription>
                    </DialogHeader>
                    <div class="flex flex-col w-full gap-4">
                      <p v-if="adoption.approved === 2" class="font-bold">
                        This request has been rejected before
                      </p>
                      <p>Name: {{ adoption.adopter.firstName }} {{ adoption.adopter.lastName }}</p>
                      <p>Has Children: {{ booleanToText(adoption.adopter.hasChildren) }}</p>
                      <p>Has Other Pets: {{ booleanToText(adoption.adopter.hasOtherPets) }}</p>
                      <a :href="'mailto:' + adoption.adopter.email"
                        >Contact Email:
                        <span class="underline">{{ adoption.adopter.email }}</span></a
                      >
                      <p>Address: {{ adoption.adopter.address }}</p>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  v-if="!hasAnApprovedAdoptionRequest && adoption.approved !== 2"
                  @click="() => $emit('reject', adoption.id)"
                >
                  <X class="w-6 h-6 space-x-2" />
                  Reject
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div v-else>
        <p>No adoption requests have been submitted for this pet.</p>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { booleanToText } from '@/lib/utils'
import type { Adoption } from '@/types/models/adoption'
import { Check, ListCollapse, X } from 'lucide-vue-next'
import { computed } from 'vue'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CardDescription from '../ui/card/CardDescription.vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

defineEmits<{
  (e: 'approve', adoptionId: string): void
  (e: 'reject', adoptionId: string): void
}>()

const props = defineProps<{
  adoptions: Adoption[]
}>()

const hasAnApprovedAdoptionRequest = computed(() => {
  return props.adoptions.some((adoption) => adoption.approved === 0)
})
</script>

<style scoped></style>
