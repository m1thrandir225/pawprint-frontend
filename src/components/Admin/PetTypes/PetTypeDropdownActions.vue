<script setup lang="ts">
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import petTypesService from '@/services/petTypes-service'
import type { PetType } from '@/types/models/petType'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { MoreHorizontal } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import * as z from 'zod'

const props = defineProps<{
  petType: PetType
}>()

const editDialogOpen = ref(false)

const schema = toTypedSchema(
  z.object({
    name: z.string(),
  }),
)
const form = useForm({
  validationSchema: schema,
  initialValues: {
    name: props.petType.name,
  },
})

const queryClient = useQueryClient()

const { mutateAsync: deleteAsync } = useMutation({
  mutationKey: ['deletePet', props.petType.id],
  mutationFn: petTypesService.deletePetType,
  onSuccess: () => {
    toast.success('Pet type deleted successfully')
    queryClient.invalidateQueries({
      queryKey: ['petTypes'],
    })
  },
  onError: (error) => {
    toast.error("Couldn't delete the pet type. Error: " + error.message)
  },
})

const { mutateAsync: updateAsync } = useMutation({
  mutationKey: ['editPetType', props.petType.id],
  mutationFn: petTypesService.updatePetType,
  onSuccess: () => {
    editDialogOpen.value = false
    toast.success('Pet type updated successfully')
    queryClient.invalidateQueries({
      queryKey: ['petTypes'],
    })
  },
  onError: (error) => {
    toast.error('There was an error updating the pet type. Error: ' + error.message)
  },
})

const onSubmit = form.handleSubmit(async (values) => {
  await updateAsync({ id: props.petType.id, ...values })
})
</script>

<template>
  <Dialog v-model:open="editDialogOpen">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="w-8 h-8 p-0">
          <span class="sr-only">Open menu</span>
          <MoreHorizontal class="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DialogTrigger as-child>
          <DropdownMenuItem> Edit </DropdownMenuItem>
        </DialogTrigger>

        <DropdownMenuItem @click="deleteAsync({ id: petType.id })"> Delete </DropdownMenuItem>
        <DropdownMenuItem @click="$emit('expand')"> Expand </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle> Editing: {{ petType.name }} </DialogTitle>
        <DialogDescription> Update the properties of the pet type. </DialogDescription>
      </DialogHeader>
      <form id="editPetTypeForm" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Enter the pet type" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
      <DialogFooter>
        <Button type="submit" form="editPetTypeForm">Edit</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
