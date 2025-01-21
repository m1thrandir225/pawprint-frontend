<template>
  <Button @click="router.back()" variant="link"> Back </Button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '../ui/button'

const router = useRouter()
</script>
