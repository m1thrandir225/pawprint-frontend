<template>
  <div></div>
</template>

<script setup lang="ts">
import type { User } from '@/types/models/user'

defineProps<{
  owner: User
}>()
</script>
