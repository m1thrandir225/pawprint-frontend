<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from '../ui/button'

defineOptions({
  name: 'DefaultRouteLink',
})

defineProps<{
  to: string
  text: string
  fontSize?: number
}>()
</script>

<template>
  <Button variant="link" as-child>
    <RouterLink :to="to" active-class="rounded-lg bg-secondaryContainer text-onSecondaryContainer">
      {{ text }}
    </RouterLink>
  </Button>
</template>
