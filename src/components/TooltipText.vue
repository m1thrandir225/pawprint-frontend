<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger> {{ text }}</TooltipTrigger>
      <TooltipContent>
        <p>{{ tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

defineProps<{
  text: string
  tooltip: string
}>()
</script>

<style scoped></style>
