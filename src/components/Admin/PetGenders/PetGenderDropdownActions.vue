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
import petGendersService from '@/services/petGender-service'
import type { PetGender } from '@/types/models/petGender'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { MoreHorizontal } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import * as z from 'zod'

const props = defineProps<{
  petGender: PetGender
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
    name: props.petGender.name,
  },
})

const queryClient = useQueryClient()

const { mutateAsync: deleteAsync } = useMutation({
  mutationKey: ['deletePetGender', props.petGender.id],
  mutationFn: petGendersService.deletePetGender,
  onSuccess: () => {
    toast.success('Pet gender deleted successfully')
    queryClient.invalidateQueries({
      queryKey: ['petGenders'],
    })
  },
  onError: (error) => {
    toast.error("Couldn't delete the pet gender. Error: " + error.message)
  },
})

const { mutateAsync: updateAsync } = useMutation({
  mutationKey: ['editPetGender', props.petGender.id],
  mutationFn: petGendersService.updatePetGender,
  onSuccess: () => {
    editDialogOpen.value = false
    toast.success('Pet gender updated successfully')
    queryClient.invalidateQueries({
      queryKey: ['petGenders'],
    })
  },
  onError: (error) => {
    toast.error('There was an error updating the pet gender. Error: ' + error.message)
  },
})

const onSubmit = form.handleSubmit(async (values) => {
  await updateAsync({ id: props.petGender.id, ...values })
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

        <DropdownMenuItem @click="deleteAsync({ id: petGender.id })"> Delete </DropdownMenuItem>
        <DropdownMenuItem @click="$emit('expand')"> Expand </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle> Editing: {{ petGender.name }} </DialogTitle>
        <DialogDescription> Update the properties of the gender. </DialogDescription>
      </DialogHeader>
      <form id="editPetGenderForm" @submit.prevent="onSubmit">
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
        <Button type="submit" form="editPetGenderForm">Edit</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
