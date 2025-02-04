<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import usersService from '@/services/users-service'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { MoreHorizontal } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const props = defineProps<{
  user: {
    id: string
  }
}>()

const queryClient = useQueryClient()

const { mutateAsync: deleteAsync } = useMutation({
  mutationKey: ['deleteShelter', props.user.id],
  mutationFn: usersService.deleteUser,
  onSuccess: () => {
    toast.success('Shelter deleted successfully')
    queryClient.invalidateQueries({
      queryKey: ['shelters'],
    })
  },
  onError: (error) => {
    toast.error("Couldn't delete the shelter. Error: " + error.message)
  },
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="deleteAsync({ id: user.id })"> Delete </DropdownMenuItem>
      <DropdownMenuItem @click="$emit('expand')"> Expand </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
