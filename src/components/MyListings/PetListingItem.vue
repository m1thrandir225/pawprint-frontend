<template>
  <Card class="w-full rounded-none border-accent">
    <CardHeader>
      <div class="flex flex-row items-center justify-between w-full">
        <div class="flex flex-col items-start gap-2">
          <CardTitle>
            {{ item.pet.name }}
          </CardTitle>
          <CardDescription>
            {{ item.pet.breed }}
          </CardDescription>
        </div>
        <div class="flex flex-row items-center gap-2">
          <Button as-child variant="default">
            <RouterLink :to="{ name: 'myListing', params: { id: item.id } }">
              <span class="sr-only"> Adoptions </span>
              <Eye class="w-6 h-6" />
            </RouterLink>
          </Button>
          <Button as-child variant="secondary">
            <RouterLink to="/welcome">
              <span class="sr-only"> Edit </span>
              <Edit2 class="w-6 h-6" />
            </RouterLink>
          </Button>
          <Button as-child variant="destructive">
            <RouterLink to="/welcome">
              <span class="sr-only"> Delete </span>

              <Trash2 class="w-6 h-6" />
            </RouterLink>
          </Button>
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
import { Edit2, Eye, Trash2 } from 'lucide-vue-next'

defineProps<{
  item: OwnerPetListing | ShelterPetListing
}>()
</script>
