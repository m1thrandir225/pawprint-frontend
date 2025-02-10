<template>
  <Card class="w-full rounded-none border-secondary">
    <CardHeader>
      <CardTitle> Pet Documents </CardTitle>
      <CardDescription> Documents related to the pet. </CardDescription>
    </CardHeader>
    <CardContent>
      <div
        class="flex flex-row items-center gap-4"
        v-for="document in documents"
        :key="document.id"
      >
        <p class="text-secondary">Type: {{ document.documentType }}</p>
        <a class="text-secondary" :href="document.documentUrl">
          {{ document.documentUrl }}
        </a>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { OwnerPetListingDocument } from '@/types/models/ownerPetListingDocument'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

defineProps<{
  documents: OwnerPetListingDocument[]
}>()
</script>
