<template>
  <div class="flex flex-row items-center justify-between w-full p-4">
    <DefaultTitle text="PawPrint" :font-size="32" />
    <div class="flex flex-row items-center gap-2">
      <DefaultRouteLink to="/login" text="Login" />
      <DefaultRouteLink to="/register" text="Register" />
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultRouteLink from './DefaultRouteLink.vue'
import DefaultTitle from './DefaultTitle.vue'

defineOptions({
  name: 'DefaultHeader',
})
</script>
