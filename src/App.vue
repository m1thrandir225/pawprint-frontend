<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="w-full min-h-dvh">
    <RouterView v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </RouterView>
  </div>
</template>
