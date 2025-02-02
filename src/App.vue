<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <div class="w-full min-h-dvh">
    <component :is="$route.meta.layout">
      <RouterView v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <div :key="route.fullPath">
            <component :is="Component" />
          </div>
        </transition>
        <Toaster class="pointer-events-auto" />
      </RouterView>
    </component>
  </div>
  <VueQueryDevtools />
</template>
