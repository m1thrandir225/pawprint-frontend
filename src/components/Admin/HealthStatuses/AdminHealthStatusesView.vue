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
import healthStatusService from '@/services/healthStatus-service'
import type { HealthStatus } from '@/types/models/healthStatus'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { Plus } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import * as z from 'zod'
import { columns } from './columns'

const { data, isLoading, isError, error, refetch } = useQuery<HealthStatus[]>({
  queryKey: ['healthStatuses'],
  queryFn: healthStatusService.getHealthStatuses,
})

const createFormOpen = ref(false)

const { mutateAsync } = useMutation({
  mutationKey: ['createHealthStatus'],
  mutationFn: healthStatusService.createHealthStatus,
  onSuccess: () => {
    toast.success('Health status created successfully')
    refetch()
  },
  onError: () => {
    toast.error('An error occurred while creating the health status')
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
    <DefaultTitle text="Health Statuses" />
    <Dialog v-model:open="createFormOpen">
      <DialogTrigger as-child>
        <Button variant="outline" size="icon" class="rounded-none">
          <Plus class="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Create a health status </DialogTitle>
          <DialogDescription> Add a new health status to the system. </DialogDescription>
        </DialogHeader>
        <form id="createHealthStatusForm" @submit.prevent="onSubmit">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter the status" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
        <DialogFooter>
          <Button type="submit" form="createHealthStatusForm">Create</Button>
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
    search-placeholder="Filter Statuses..."
  />
</template>
