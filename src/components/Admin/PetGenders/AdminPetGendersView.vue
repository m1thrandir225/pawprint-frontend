<script setup lang="ts">
import DataTable from '@/components/DataTable/DataTable.vue'
import DefaultError from '@/components/Global/DefaultError.vue'
import DefaultLoader from '@/components/Global/DefaultLoader.vue'
import DefaultTitle from '@/components/Global/DefaultTitle.vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import petGendersService from '@/services/petGender-service'
import type { PetGender } from '@/types/models/petGender'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { Plus } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import * as z from 'zod'
import { columns } from './columns'

const { data, isLoading, isError, error, refetch } = useQuery<PetGender[]>({
  queryKey: ['petGenders'],
  queryFn: petGendersService.getPetGenders,
})

const createFormOpen = ref(false)

const { mutateAsync } = useMutation({
  mutationKey: ['createPetGender'],
  mutationFn: petGendersService.createPetGender,
  onSuccess: () => {
    toast.success('Pet gender created successfully')
    refetch()
  },
  onError: () => {
    toast.error('An error occurred while creating the pet gender')
  },
})

const zodShema = z.object({
  name: z.string(),
})

const schema = toTypedSchema(zodShema)
type FormValues = z.infer<typeof zodShema>

const form = useForm({
  validationSchema: schema,
})

const onSubmit = form.handleSubmit(async (values: FormValues) => {
  await mutateAsync(values)
  createFormOpen.value = false
})
</script>

<template>
  <div class="flex flex-row items-center justify-between">
    <DefaultTitle text="Pet Genders" />
    <Dialog v-model:open="createFormOpen">
      <DialogTrigger as-child>
        <Button variant="outline" size="icon" class="rounded-none">
          <Plus class="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Create a pet gender </DialogTitle>
          <DialogDescription> Add a new pet gender to the system. </DialogDescription>
        </DialogHeader>
        <form id="createPetGenderForm" @submit.prevent="onSubmit">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter the pet gender" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
        <DialogFooter>
          <Button type="submit" form="createPetGenderForm">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
  <DefaultLoader v-if="isLoading" />
  <DefaultError v-else-if="isError" :error="error?.message" />
  <DataTable
    v-else-if="data"
    :data="data"
    :columns="columns"
    class="max-w-full"
    searchable-column="name"
    search-placeholder="Filter Genders..."
  />
</template>
