<template>
  <div>
    <FormField v-slot="{ componentField }" name="veterinarianName">
      <FormItem v-auto-animate>
        <FormLabel>Veterinarian Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="James Brown" v-bind="componentField" />
        </FormControl>
        <FormDescription> The name of the veterinarian </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="veterinarianClinicName">
      <FormItem v-auto-animate>
        <FormLabel> Clinic Name </FormLabel>
        <FormControl>
          <Input type="text" placeholder="Petly Clinic" v-bind="componentField" />
        </FormControl>
        <FormDescription> The name of the veterinarian's clinic. </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="veterinarianContactNumber">
      <FormItem v-auto-animate>
        <FormLabel> Contact Number </FormLabel>
        <FormControl>
          <Input type="text" placeholder="+389 000 000" v-bind="componentField" />
        </FormControl>
        <FormDescription> The Veterinarian/Clinic contact number </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="veterinarianEmail">
      <FormItem v-auto-animate>
        <FormLabel> Email </FormLabel>
        <FormControl>
          <Input type="email" placeholder="james.brown@petly.com" v-bind="componentField" />
        </FormControl>
        <FormDescription> The Veterinarian/Clinic's email. </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
  </div>
  <div class="flex flex-col items-start gap-4 p-4 border">
    <FormField v-slot="{ value, setValue }" name="veterinarianSpecializations">
      <div>
        <FormLabel> Veterinarian Specialization's </FormLabel>
        <FormDescription>
          Specializations of the veterinarian (if no specific specializations add 'General')
        </FormDescription>
      </div>
      <FormItem class="flex items-center justify-between w-full gap-4 space-y-0">
        <Input v-model="specializationInput" type="text" placeholder="Specialization" />
        <Button
          class="m-0 rounded-none"
          size="icon"
          variant="outline"
          @click="
            (e: Event) => {
              e.preventDefault()
              setValue(value ? [...value, specializationInput] : [specializationInput])
              specializationInput = ''
            }
          "
        >
          <Plus />
        </Button>
      </FormItem>

      <ScrollArea v-if="value.length > 0" class="w-full h-[250px] px-4">
        <div
          class="flex items-center justify-between w-full my-2"
          v-for="(specialization, index) in value"
          :key="specialization"
        >
          <p>{{ specialization }}</p>
          <Button
            size="icon"
            variant="destructive"
            class="rounded-none"
            @click="setValue(value.filter((_: string[], i: number) => i !== index))"
          >
            <Trash />
          </Button>
        </div>
        <FormMessage />
      </ScrollArea>
    </FormField>
  </div>
</template>

<script setup lang="ts">
import { Plus, Trash } from 'lucide-vue-next'
import { Button } from '../ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { ref } from 'vue'
import { ScrollArea } from '../ui/scroll-area'

const specializationInput = ref<string>('')
</script>

<style scoped></style>
