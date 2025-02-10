<template>
  <Button size="icon" variant="outline" @click="toggleDark()" class="rounded-lg text-primary">
    <Moon class="w-6 h-6" v-if="isDark" />
    <Sun class="w-6 h-6" v-else />
  </Button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sun } from 'lucide-vue-next'
import { Button } from './ui/button'

const isDark = useDark()

const toggleDark = useToggle(isDark)
</script>
