<template>
  <div class="w-full h-full">
    <h1 class="text-2xl font-semibold text-destructive font-generalSans">{{ error }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: string
}>()
</script>

<style scoped></style>
