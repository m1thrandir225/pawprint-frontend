<script setup lang="ts">
import { RouterLink } from 'vue-router'

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
  <RouterLink
    :to="to"
    :style="{ 'font-style': (fontSize != null ? fontSize : 16) + 'px' }"
    active-class="rounded-lg bg-secondaryContainer text-onSecondaryContainer"
    class="px-4 py-1 font-medium transition-all ease-in bg-transparent rounded-md duration-250 text-secondary font-generalSans hover:opacity-75 hover:bg-secondaryContainer"
  >
    {{ text }}
  </RouterLink>
</template>
