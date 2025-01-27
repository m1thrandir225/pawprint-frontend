<template>
  <Card class="w-full rounded-none border-accent">
    <CardHeader>
      <CardTitle>Adoptions</CardTitle>
      <CardDescription>All submissions for the pet.</CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col w-full gap-3">
      <Table>
        <TableCaption> A list of submitted adoptions for the current pet </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Adopter Name</TableHead>
            <TableHead>View Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="adoption in adoptions" :key="adoption.id">
            <TableCell class="w-[90%]"
              >{{ adoption.adopter.firstName }} {{ adoption.adopter.lastName }}</TableCell
            >
            <TableCell>
              <Dialog>
                <DialogTrigger as-child>
                  <Button variant="default">
                    <ListCollapse />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adoption details</DialogTitle>
                    <DialogDescription> Information about the adoption request </DialogDescription>
                  </DialogHeader>
                  <div class="flex flex-col w-full gap-4">
                    <p>Name: {{ adoption.adopter.firstName }} {{ adoption.adopter.lastName }}</p>
                    <p>Has Children: {{ adoption.adopter.hasChildren }}</p>
                    <p>Has Other Pets: {{ adoption.adopter.hasOtherPets }}</p>
                    <p>Contact Email: {{ adoption.adopter.email }}</p>
                    <p>Address: {{ adoption.adopter.address }}</p>
                  </div>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { Adoption } from '@/types/models/adoption'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CardDescription from '../ui/card/CardDescription.vue'
import { ListCollapse } from 'lucide-vue-next'
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

defineProps<{
  adoptions: Adoption[]
}>()
</script>

<style scoped></style>
