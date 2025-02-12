<template>
  <div v-if="adoptionStatusesQueryIsPending">
    <Skeleton class="w-full h-[500px] rounded-lg" />
  </div>
  <div v-else-if="adoptionStatusesQueryIsError && adoptionStatusesQueryError">
    <p class="text-destructive">{{ adoptionStatusesQueryError.message }}</p>
  </div>
  <div class="w-full h-auto p-4 border rounded-lg border-1" v-else-if="adoptionStatuses">
    <div class="flex flex-row items-center justify-between w-full">
      <div class="flex flex-col gap-2">
        <h1 class="text-xl font-bold font-splieSans text-primary">
          Update Current Adoption Process
        </h1>
        <p class="text-lg text-secondary font-generalSans">
          Update the status and information of the current adoption.
        </p>
      </div>
      <Button variant="destructive" @click="rejectAdoption" :disabled="isRejectingAdoption">
        <Loader2 v-if="isRejectingAdoption" class="animate-spin" />
        <span v-else>Reject Current Adoption</span>
      </Button>
    </div>
    <form class="flex flex-col gap-8" @submit="onSubmit">
      <div class="grid w-full h-full grid-cols-1 gap-4 md:grid-cols-2">
        <FormField v-slot="{ componentField }" name="adoptionStatusId">
          <FormItem v-auto-animate>
            <FormLabel>Adoption Status</FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select the size of the current adoption" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="status in adoptionStatuses"
                    :value="status.id"
                    :key="status.id"
                  >
                    {{ status.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormDescription> The status of the current adoption. </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ value, setValue }" name="followUpDate">
          <FormItem class="space-y-2" v-auto-animate>
            <FormLabel> Follow Up Date </FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    :class="
                      cn('w-full ps-3 text-start font-normal', !value && 'text-muted-foreground')
                    "
                  >
                    <span>{{
                      followUpDateValue
                        ? df.format(new Date(followUpDateValue.toString()))
                        : 'Adoption Follow Up Date'
                    }}</span>
                    <CalendarIcon class="w-4 h-4 opacity-50 ms-auto" />
                  </Button>
                  <input hidden />
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar
                  v-model:placeholder="placeholder"
                  v-model="followUpDateValue"
                  calendar-label="Adoption Follow Up Date"
                  initial-focus
                  :min-value="new CalendarDate(1900, 1, 1)"
                  @update:model-value="
                    (v) => {
                      if (v) {
                        setValue(v.toString())
                      } else {
                        setValue(undefined)
                      }
                    }
                  "
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              The next check-in (if needed) with the candidate for the adoption of the pet.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="counselorNotes">
          <FormItem v-auto-animate>
            <FormLabel>Counselor Notes</FormLabel>
            <FormControl>
              <Textarea v-bind="componentField" placeholder="Counselor Notes" class="h-[200px]" />
            </FormControl>
            <FormDescription
              >Notes (if any) from a counselor that is overlooking the current adoption process.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ value, setValue }" name="adoptionDate">
          <FormItem class="space-y-2" v-auto-animate>
            <FormLabel> Adoption Date </FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    :class="
                      cn('w-full ps-3 text-start font-normal', !value && 'text-muted-foreground')
                    "
                  >
                    <span>{{
                      adoptionDateValue
                        ? df.format(new Date(adoptionDateValue.toString()))
                        : 'Adoption Date'
                    }}</span>
                    <CalendarIcon class="w-4 h-4 opacity-50 ms-auto" />
                  </Button>
                  <input hidden />
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar
                  v-model:placeholder="placeholder"
                  v-model="adoptionDateValue"
                  calendar-label="Adoption Date"
                  initial-focus
                  :min-value="new CalendarDate(1900, 1, 1)"
                  @update:model-value="
                    (v) => {
                      if (v) {
                        setValue(v.toString())
                      } else {
                        setValue(undefined)
                      }
                    }
                  "
                />
              </PopoverContent>
            </Popover>
            <FormDescription> The date the candidate can expect to adopt the pet. </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <Button type="submit" class="col-start-2" :disabled="isPending">
        <Loader2 v-if="isPending" class="animate-spin" />
        <span v-else>Update Adoption</span>
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import adoptionStatusService from '@/services/adoptionStatus-service'
import type { Adoption } from '@/types/models/adoption'
import { CalendarDate, DateFormatter, parseDate, type DateValue } from '@internationalized/date'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { CalendarIcon, Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref, type Ref } from 'vue'
import * as z from 'zod'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '../ui/form'
import FormLabel from '../ui/form/FormLabel.vue'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Skeleton } from '../ui/skeleton'
import { Textarea } from '../ui/textarea'
import type { UpdateAdoptionDTO } from '@/types/dto/UpdateAdoptionDTO'
import adoptionService from '@/services/adoption-service'
import { toast } from 'vue-sonner'

const queryClient = useQueryClient()

const props = defineProps<{
  adoption: Adoption
}>()

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const {
  data: adoptionStatuses,
  isPending: adoptionStatusesQueryIsPending,
  isError: adoptionStatusesQueryIsError,
  error: adoptionStatusesQueryError,
} = useQuery({
  queryKey: ['adoptionStatuses'],
  queryFn: () => adoptionStatusService.getAdoptionStatuses(),
})

const updateSchema = toTypedSchema(
  z.object({
    adoptionDate: z.string().nullable(),
    followUpDate: z.string().nullable(),
    counselorNotes: z.string().nullable(),
    adoptionStatusId: z.string(),
  }),
)

const form = useForm({
  validationSchema: updateSchema,
  initialValues: {
    adoptionDate: props.adoption.adoptionDate,
    followUpDate: props.adoption.followUpDate,
    adoptionStatusId: props.adoption.pet.adoptionStatus.id,
    counselorNotes: props.adoption.counselorNotes,
  },
})

const onSubmit = form.handleSubmit(async (values) => {
  await mutateAsync({
    id: props.adoption.id,
    adoptionStatusId: values.adoptionStatusId,
    adoptionDate: values.adoptionDate || undefined,
    followUpDate: values.followUpDate || undefined,
    counselorNotes: values.counselorNotes || undefined,
  })
})

const placeholder = ref()

const followUpDateValue = ref(
  props.adoption.followUpDate
    ? parseDate(new Date(props.adoption.followUpDate).toISOString().split('T')[0])
    : undefined,
) as Ref<DateValue | undefined>
const adoptionDateValue = ref<CalendarDate | undefined>(
  props.adoption.adoptionDate
    ? parseDate(new Date(props.adoption.adoptionDate).toISOString().split('T')[0])
    : undefined,
) as Ref<DateValue | undefined>

const { isPending, mutateAsync } = useMutation({
  mutationKey: ['updateAdoption', props.adoption.id],
  mutationFn: (input: UpdateAdoptionDTO) => adoptionService.updateAdoption(input),
  onSuccess: () => {
    console.log('Adoption updated')
  },
  onError: (error) => {
    toast.error('Failed to update adoption. Error: ' + error.message)
  },
})

const { isPending: isRejectingAdoption, mutateAsync: rejectAdoptionMutateAsync } = useMutation({
  mutationKey: ['rejectAdoption', props.adoption.id],
  mutationFn: (input: { id: string; approved: number }) =>
    adoptionService.updateAdoptionStatus(input),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['adoptionData', props.adoption.pet.id],
    })
  },
  onError: (error) => {
    toast.error('Failed to reject adoption. Error: ' + error.message)
  },
})

const rejectAdoption = async () => {
  await rejectAdoptionMutateAsync({ id: props.adoption.id, approved: 2 })
}
</script>
