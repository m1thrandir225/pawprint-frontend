<template>
  <Card class="w-full rounded-none border-accent">
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
            :class="{ 'bg-accent/50 hover:bg-accent/20': adoption.isSuccessful }"
          >
            <TableCell class="w-[90%]"
              >{{ adoption.adopter.firstName }} {{ adoption.adopter.lastName }}</TableCell
            >
            <TableCell>
              <div class="flex flex-row items-center justify-center gap-4">
                <Button variant="default" v-if="isAdoptedAlready">
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
                <Button variant="destructive" v-if="isAdoptedAlready">
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
import type { Adoption } from '@/types/models/adoption'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CardDescription from '../ui/card/CardDescription.vue'
import { Check, ListCollapse, X } from 'lucide-vue-next'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { computed } from 'vue'
import { booleanToText } from '@/lib/utils'

const props = defineProps<{
  adoptions: Adoption[]
}>()

const isAdoptedAlready = computed(() => {
  return props.adoptions.some((adoption) => adoption.isSuccessful)
})
</script>

<style scoped></style>
