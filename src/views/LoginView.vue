<script setup lang="ts">
import DefaultSubtitle from '@/components/Global/DefaultSubtitle.vue'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import authService from '@/services/auth-service'
import useAuthStore from '@/stores/auth-store'
import type { LoginRequest } from '@/types/services/auth'
import { vAutoAnimate } from '@formkit/auto-animate'
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'
import * as z from 'zod'

const route = useRoute()
const router = useRouter()

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(9)
      .regex(/[^a-zA-Z]/),
  }),
)
const form = useForm({
  validationSchema: formSchema,
})
const authStore = useAuthStore()

const loginQuery = useMutation({
  mutationKey: ['login'],
  mutationFn: (input: LoginRequest) => authService.login(input),
  onSuccess: (response) => {
    authStore.login(response)
  },
})

const onSubmit = form.handleSubmit(async (values) => {
  const { email, password } = values

  await loginQuery.mutate({ email, password })

  if (route.query.redirect) {
    router.push(route.query.redirect as string)
  } else {
    router.push('/')
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex flex-col items-center justify-center h-full min-h-[650px] p-8 w-full gap-4">
      <form
        @submit="onSubmit"
        class="flex flex-col w-full gap-2 max-w-[400px] border border-outline p-8 rounded-xl"
      >
        <DefaultSubtitle text="Login" />
        <FormField v-slot="{ componentField }" name="email">
          <FormItem v-auto-animate>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="text" placeholder="james.doe@gmail.com" v-bind="componentField" />
            </FormControl>
            <FormDescription> Your email </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem v-auto-animate>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="secre***" v-bind="componentField" />
            </FormControl>
            <FormDescription> Your password. </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button :disabled="false" type="submit"> Login </Button>
      </form>
      <RouterLink to="/register">
        Don't have an account? <span class="font-bold">Register</span></RouterLink
      >
    </div>
  </div>
</template>
