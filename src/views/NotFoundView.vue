<script setup lang="ts">
import DefaultContainer from '@/components/Global/DefaultContainer.vue'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <DefaultContainer additional-class="flex flex-col items-center justify-center gap-4 min-h-dvh">
    <h1 class="font-bold text-7xl font-splieSans text-primary">Page Not Found</h1>
    <p class="text-xl font-medium font-generalSans text-foreground">
      Sorry the page you were looking for doesn't exist.
    </p>
    <Button @click="router.back()" variant="secondary"> Go back </Button>
  </DefaultContainer>
</template>
