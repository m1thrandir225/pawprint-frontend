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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import authService from '@/services/auth-service'
import type { RegisterUserRequest } from '@/types/services/auth'
import { vAutoAnimate } from '@formkit/auto-animate'
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import * as z from 'zod'

const router = useRouter()

const homeTypes = ['Flat', 'House'] as const

const formSchema = toTypedSchema(
  z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    address: z.string().min(2).max(100),
    password: z
      .string()
      .min(9)
      .regex(/[^a-zA-Z]/),
    homeType: z.enum(homeTypes),
    hasChildren: z.boolean().default(false),
    hasOtherPets: z.boolean().default(false),
  }),
)

const { isPending, mutateAsync } = useMutation({
  mutationKey: ['registerAdopter'],
  mutationFn: (input: RegisterUserRequest) => authService.registerAdopter(input),
  onSuccess: () => {
    router.replace('/login')
    toast.success('Successfully registered. Please login to continue.')
  },
  onError: (error) => {
    toast.error("Couldn't register. Error: " + error.message)
  },
})

const form = useForm({
  validationSchema: formSchema,
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
          <DefaultSubtitle text="Register as an adopter" />
          <DefaultParagraph text="Are you ready to adopt your new pet?" />
          <FormField v-slot="{ componentField }" name="firstName">
            <FormItem v-auto-animate>
              <FormLabel>Your First Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="James" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="lastName">
            <FormItem v-auto-animate>
              <FormLabel>Your Last Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Doe" v-bind="componentField" />
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
          <FormField v-slot="{ componentField }" name="address">
            <FormItem v-auto-animate>
              <FormLabel>Your Address</FormLabel>
              <FormControl>
                <Input type="text" placeholder="James Street 12." v-bind="componentField" />
              </FormControl>
              <FormDescription> Please provide your current address. </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="homeType">
            <FormItem v-auto-animate>
              <FormLabel>Home Type</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your home type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="homeType in homeTypes" :value="homeType" :key="homeType">
                      {{ homeType }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription>
                Please select the home that most describes your current living condition.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="hasChildren">
            <FormItem class="flex flex-row items-center justify-between p-4 border rounded-none">
              <div class="space-y-0.5">
                <FormLabel class="text-base"> Have children </FormLabel>
                <FormDescription> Do you have children? </FormDescription>
              </div>
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="hasOtherPets">
            <FormItem class="flex flex-row items-center justify-between p-4 border rounded-none">
              <div class="space-y-0.5">
                <FormLabel class="text-base"> Have Pets </FormLabel>
                <FormDescription> Do you have other pets? </FormDescription>
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
          src="/register-user-hero.jpg"
        />
      </div>
    </div>
  </div>
</template>
