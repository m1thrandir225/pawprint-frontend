<script setup lang="ts">
import DefaultParagraph from '@/components/Global/DefaultParagraph.vue'
import DefaultRouteLink from '@/components/Global/DefaultRouteLink.vue'
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
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import { Switch } from '@/components/ui/switch'
import authService from '@/services/auth-service'
import type { RegisterShelterRequest } from '@/types/services/auth'
import { vAutoAnimate } from '@formkit/auto-animate'
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import * as z from 'zod'

const router = useRouter()

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z
      .string()
      .min(9)
      .regex(/[^a-zA-Z]/),
    capacity: z.number().min(1),
    isNoKill: z.boolean().default(false),
    website: z.string().optional().nullable().default(null),
    address: z.string().min(2).max(50),
    phoneNumber: z.string().min(9).max(15),
  }),
)
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    capacity: 1,
  },
})

const { isPending, mutateAsync } = useMutation({
  mutationKey: ['register'],
  mutationFn: (input: RegisterShelterRequest) => authService.registerShelter(input),
  onSuccess: () => {
    toast.success('Successfully registered. Please login to continue.')
    router.replace('/login')
  },
  onError: (error) => {
    toast.error("Couldn't register. Error: " + error.message)
  },
})

const onSubmit = form.handleSubmit(async (values) => {
  await mutateAsync(values)
})
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="grid w-full h-full grid-cols-2">
      <div class="flex flex-col items-center justify-center w-full h-full p-8">
        <DefaultRouteLink to="/register" text="Back" class="self-start" />
        <form @submit="onSubmit" class="flex flex-col w-full gap-2">
          <DefaultSubtitle text="Register as a Shelter" />
          <DefaultParagraph text="Reigster yourself as a licensed shelter" />
          <FormField v-slot="{ componentField }" name="name">
            <FormItem v-auto-animate>
              <FormLabel>Shelter's Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Petly" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="email">
            <FormItem v-auto-animate>
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="james.doe@gmail.com" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem v-auto-animate>
              <FormLabel>Your Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="secre***" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ value }" name="capacity">
            <FormItem v-auto-animate>
              <FormLabel>Shelter Capacity</FormLabel>
              <NumberField
                class="gap-2"
                :min="0"
                :model-value="value"
                @update:model-value="
                  (v: number | undefined) => {
                    if (v) {
                      form.setFieldValue('capacity', v)
                    } else {
                      form.setFieldValue('capacity', undefined)
                    }
                  }
                "
              >
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <FormControl>
                    <NumberFieldInput />
                  </FormControl>
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              <FormDescription> Your shelter's pet capacity. </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="phoneNumber">
            <FormItem v-auto-animate>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="text" placeholder="+389 000 000 00" v-bind="componentField" />
              </FormControl>
              <FormDescription> Your shelter's phone number. </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="address">
            <FormItem v-auto-animate>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input type="text" placeholder="James Street 12." v-bind="componentField" />
              </FormControl>
              <FormDescription> Your shelter's address. </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="website">
            <FormItem v-auto-animate>
              <FormLabel>Website (optional) </FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://shelters.co.uk" v-bind="componentField" />
              </FormControl>
              <FormDescription> Your shelter's website. </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="isNoKill">
            <FormItem
              v-auto-animate
              class="flex flex-row items-center justify-between p-4 border rounded-none"
            >
              <div class="space-y-0.5">
                <FormLabel class="text-base"> No Kill </FormLabel>
                <FormDescription> Is your shelter a no kill one? </FormDescription>
              </div>
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
            </FormItem>
          </FormField>

          <Button type="submit" :disabled="isPending">
            <Loader2 v-if="isPending" class="animate-spin" />
            <span v-else>Register</span>
          </Button>
        </form>
      </div>
      <div class="w-full h-full p-8">
        <img
          class="object-cover w-full h-full min-h-[300px] rounded-[32px]"
          src="/register-shelter-hero.jpg"
        />
      </div>
    </div>
  </div>
</template>
