<template>
  <div v-for="adoption in adoptions" :key="adoption.id">
    <Card class="w-full rounded-none border-accent">
      <CardHeader>
        <CardTitle>
          Adoption by: {{ adoption.adopter.firstName }} {{ adoption.adopter.lastName }}
        </CardTitle>
        <CardDescription> Adoption Date: {{ adoption.adoptionDate }} </CardDescription>
      </CardHeader>
      <CardContent> Success Status: {{ adoption.isSuccessful }} </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { Adoption } from '@/types/models/adoption'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CardDescription from '../ui/card/CardDescription.vue'

defineProps<{
  adoptions: Adoption[]
}>()
</script>

<style scoped></style>
