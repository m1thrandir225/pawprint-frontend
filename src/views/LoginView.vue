<script setup lang="ts">
import DefaultContainer from '@/components/Global/DefaultContainer.vue'
import DefaultSubtitle from '@/components/Global/DefaultSubtitle.vue'
import {
  FormControl,
  FormField,
  FormMessage,
  FormDescription,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { vAutoAnimate } from '@formkit/auto-animate'

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

const onSubmit = form.handleSubmit((values) => {
  alert('Form submitted!' + values)
  console.log('Form submitted!', values)
})
</script>

<template>
  <DefaultContainer additional-class="flex flex-col items-center justify-center">
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
        <Button type="submit"> Login </Button>
      </form>
      <RouterLink to="/register">
        Don't have an account? <span class="font-bold">Register</span></RouterLink
      >
    </div>
  </DefaultContainer>
</template>
