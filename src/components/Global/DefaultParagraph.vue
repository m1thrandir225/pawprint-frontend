<template>
  <p
    class="prose font-generalSans text-foreground"
    :style="{ 'font-size': (fontSize != undefined ? fontSize : 14) + 'px' }"
  >
    {{ text }}
  </p>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DefaultParagraph',
})
defineProps<{
  text: string
  fontSize?: number
}>()
</script>
