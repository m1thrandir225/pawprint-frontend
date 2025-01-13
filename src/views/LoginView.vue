<script setup lang="ts">
import DefaultContainer from '@/components/ui/DefaultContainer.vue'
import DefaultSubtitle from '@/components/ui/DefaultSubtitle.vue'
import { ref } from 'vue'

const email = ref()
const password = ref()

async function login(params: { email: string; password: string }) {
  alert(JSON.stringify(params))
}
</script>

<template>
  <DefaultContainer additional-class="flex flex-col items-center justify-center">
    <div class="flex flex-col items-center justify-center h-full min-h-[650px] p-8 w-full">
      <FormKit type="form" submit-label="Login" @submit="login">
        <DefaultSubtitle text="Login" />
        <FormKit
          v-model="email"
          type="text"
          name="email"
          label="Your Email"
          placeholder="james.doe@gmail.com"
          help="What is your email?"
          prefix-icon="email"
          validation="required|email"
          class=""
        />
        <FormKit
          v-model="password"
          type="password"
          name="password"
          label="Your Password"
          placeholder="se****"
          prefix-icon="password"
          validation="required|length:9|matches:/[^a-zA-Z]/"
        />
      </FormKit>
      <RouterLink to="/register">
        Don't have an account? <span class="font-bold">Register</span></RouterLink
      >
    </div>
  </DefaultContainer>
</template>
