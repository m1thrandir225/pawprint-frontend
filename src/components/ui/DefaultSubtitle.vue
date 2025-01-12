<template>
  <h3
    class="font-bold font-splieSans text-secondary"
    :style="{ 'font-size': (fontSize != undefined ? fontSize : 24) + 'px' }"
  >
    {{ text }}
  </h3>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DefaultSubtitle',
})

defineProps<{
  text: string
  fontSize?: number
}>()
</script>
