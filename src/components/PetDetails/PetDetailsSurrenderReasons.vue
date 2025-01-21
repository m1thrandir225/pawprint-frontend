<template>
  <Card class="w-full rounded-none border-accent">
    <CardHeader>
      <CardTitle>Surrender Reasons</CardTitle>
      <CardDescription> The owner's reasons for surrendering the pet. </CardDescription>
    </CardHeader>
    <CardContent>
      <p class="text-accent">{{ surrenderReason.description }}</p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { OwnerSurrenderReason } from '@/types/models/ownerSurrenderReason'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

defineProps<{
  surrenderReason: OwnerSurrenderReason
}>()
</script>
