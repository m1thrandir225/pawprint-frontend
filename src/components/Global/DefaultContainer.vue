<script setup lang="ts">
defineProps<{
  additionalClass?: string
}>()
</script>

<template>
  <div class="container w-full h-full mx-auto overflow-hidden" :class="additionalClass">
    <slot></slot>
  </div>
</template>
