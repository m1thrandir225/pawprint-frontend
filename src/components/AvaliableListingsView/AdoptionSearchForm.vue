<template>
  <div v-if="isError">
    <p v-if="error" class="text-destructive">Something went wrong: {{ error }}</p>
    <p v-else class="text-destructive">Something went wrong</p>
  </div>
  <div v-else-if="isLoading" class="w-full my-2">
    <Skeleton class="w-full h-12 rounded-lg" />
  </div>
  <form
    v-else-if="petTypeData && petGenderData && petSizeData"
    @submit="onSubmit"
    class="flex flex-col justify-between w-full gap-2 p-2 lg:gap-0 md:items-center lg:flex-row"
  >
    <div class="flex flex-col justify-start gap-2 md:items-center lg:flex-row lg:gap-8">
      <FormField v-slot="{ componentField }" name="search">
        <FormItem class="flex flex-row items-center justify-center gap-4 space-y-0">
          <FormLabel class="font-bold"> Search </FormLabel>
          <FormControl>
            <Input
              type="text"
              class="w-full lg:w-[200px]"
              placeholder="Pet Name"
              v-bind="componentField"
            />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="petTypeId">
        <FormItem class="flex flex-row items-center justify-center w-full gap-4 space-y-0">
          <FormLabel class="font-bold">Type</FormLabel>
          <Select v-if="petTypeData" v-bind="componentField" default-value="all">
            <FormControl class="!mt-0">
              <SelectTrigger class="w-full lg:w-[150px]">
                <SelectValue placeholder="Pet Type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all"> All </SelectItem>
                <SelectItem v-for="petType in petTypeData" :key="petType.id" :value="petType.id"
                  >{{ petType.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="petSizeId">
        <FormItem class="flex flex-row items-center justify-center gap-4">
          <FormLabel class="font-bold">Size</FormLabel>
          <Select v-if="petSizeData" v-bind="componentField" default-value="all">
            <FormControl class="!mt-0">
              <SelectTrigger class="w-full lg:w-[150px]">
                <SelectValue placeholder="Pet Size" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all"> All </SelectItem>
                <SelectItem v-for="petSize in petSizeData" :key="petSize.id" :value="petSize.id"
                  >{{ petSize.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="petGenderId">
        <FormItem class="flex flex-row items-center justify-center gap-4">
          <FormLabel class="font-bold">Gender</FormLabel>
          <Select v-if="petGenderData" v-bind="componentField" default-value="all">
            <FormControl class="!mt-0">
              <SelectTrigger class="w-full lg:w-[150px] mt-0">
                <SelectValue class="mt-0" placeholder="Pet Gender" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all"> All </SelectItem>
                <SelectItem
                  v-for="petGender in petGenderData"
                  :key="petGender.id"
                  :value="petGender.id"
                >
                  {{ petGender.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <Button type="submit">Search</Button>
  </form>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import type { PetGender } from '@/types/models/petGender'
import type { PetSize } from '@/types/models/petSize'
import type { PetType } from '@/types/models/petType'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'

const emit = defineEmits(['submit'])

defineProps<{
  isError: boolean
  isLoading: boolean
  error?: string
  petTypeData: PetType[] | undefined
  petSizeData: PetSize[] | undefined
  petGenderData: PetGender[] | undefined
}>()

const shcema = toTypedSchema(
  z.object({
    petTypeId: z.string().optional(),
    petSizeId: z.string().optional(),
    petGenderId: z.string().optional(),
    search: z.string().optional(),
  }),
)

const form = useForm({
  validationSchema: shcema,
  initialValues: {
    petGenderId: '',
    petSizeId: '',
    petTypeId: '',
    search: '',
  },
})

const onSubmit = form.handleSubmit(async (values) => {
  emit('submit', values)
})
</script>
