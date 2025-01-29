<template>
  <div v-if="isError">
    <p v-if="error" class="text-destructive">Something went wrong: {{ error }}</p>
    <p v-else class="text-destructive">Something went wrong</p>
  </div>
  <form
    v-else-if="petTypeData && petGenderData && petSizeData"
    class="flex flex-row items-center justify-between w-full p-2"
  >
    <div class="flex flex-row items-center justify-start gap-8">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="flex flex-row items-center justify-center gap-4">
          <FormLabel class="font-bold">Type</FormLabel>
          <Select v-if="petTypeData" v-bind="componentField" default-value="all">
            <FormControl class="!mt-0">
              <SelectTrigger class="w-[150px]">
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

      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="flex flex-row items-center justify-center gap-4">
          <FormLabel class="font-bold">Size</FormLabel>
          <Select v-if="petSizeData" v-bind="componentField" default-value="all">
            <FormControl class="!mt-0">
              <SelectTrigger class="w-[150px]">
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

      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="flex flex-row items-center justify-center gap-4">
          <FormLabel class="font-bold">Gender</FormLabel>
          <Select v-if="petGenderData" v-bind="componentField" default-value="all">
            <FormControl class="!mt-0">
              <SelectTrigger class="w-[150px] mt-0">
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

defineProps<{
  isError: boolean
  error?: string
  petTypeData: PetType[] | undefined
  petSizeData: PetSize[] | undefined
  petGenderData: PetGender[] | undefined
}>()
</script>
