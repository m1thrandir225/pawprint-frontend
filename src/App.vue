<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <div class="w-full min-h-dvh">
    <component :is="$route.meta.layout">
      <RouterView v-slot="{ Component, route }" :key="$route.fullPath">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
        <Toaster class="pointer-events-auto" />
      </RouterView>
    </component>
  </div>
  <VueQueryDevtools />
</template>
