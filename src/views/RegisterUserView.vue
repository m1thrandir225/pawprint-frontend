<script setup lang="ts">
import DefaultSubtitle from '@/components/ui/DefaultSubtitle.vue'
import DefaultParagraph from '@/components/ui/DefaultParagraph.vue'
import DefaultContainer from '@/components/ui/DefaultContainer.vue'
import DefaultRouteLink from '@/components/ui/DefaultRouteLink.vue'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  FormControl,
  FormField,
  FormMessage,
  FormDescription,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

const homeTypes = ['Flat', 'House'] as const

const formSchema = toTypedSchema(
  z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z
      .string()
      .min(9)
      .regex(/[^a-zA-Z]/),
    homeType: z.enum(homeTypes),
    hasChildren: z.boolean().default(false),
    hasOtherPets: z.boolean().default(false),
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
  <DefaultContainer additional-class="flex items-center justify-center min-h-dvh">
    <div class="grid w-full h-full grid-cols-2 p-8 border border-outline rounded-[16px]">
      <div class="flex flex-col items-center justify-center h-full min-h-[650px] p-8 w-full">
        <DefaultRouteLink to="/register" text="Back" class="self-start" />
        <form @submit="onSubmit" class="flex flex-col w-full gap-4">
          <DefaultSubtitle text="Register as an adopter" />
          <DefaultParagraph text="Are you ready to adopt your new pet?" />
          <FormField v-slot="{ componentField }" name="firstName">
            <FormItem>
              <FormLabel>Your First Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="James" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="lastName">
            <FormItem>
              <FormLabel>Your Last Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Doe" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="james.doe@gmail.com" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Your Password</FormLabel>
              <FormControl>
                <Input type="text" placeholder="secre***" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="homeType">
            <FormItem>
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
            <FormItem class="flex flex-row items-center justify-between p-4 border rounded-lg">
              <div class="space-y-0.5">
                <FormLabel class="text-base"> Have children? </FormLabel>
                <FormDescription> Do you have children? </FormDescription>
              </div>
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="hasOtherPets">
            <FormItem class="flex flex-row items-center justify-between p-4 border rounded-lg">
              <div class="space-y-0.5">
                <FormLabel class="text-base"> Have Pets? </FormLabel>
                <FormDescription> Do you have other pets? </FormDescription>
              </div>
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
            </FormItem>
          </FormField>

          <Button type="submit"> Submit </Button>
        </form>
      </div>
      <img
        class="object-cover w-full h-full max-h-[750px] rounded-[32px]"
        src="https://images.unsplash.com/photo-1415369629372-26f2fe60c467?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
  </DefaultContainer>
</template>
