<template>
  <h1
    class="font-bold font-splieSans text-primary"
    :style="{ 'font-size': (fontSize != undefined ? fontSize : 28) + 'px' }"
  >
    {{ text }}
  </h1>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DefaultTitle',
})

defineProps<{
  text: string
  fontSize?: number
}>()
</script>
