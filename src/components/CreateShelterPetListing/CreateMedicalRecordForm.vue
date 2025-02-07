<script setup lang="ts">
import { cn } from '@/lib/utils'
import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { toDate } from 'radix-vue/date'
import { ref } from 'vue'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Switch } from '../ui/switch'
import { Icon } from '@iconify/vue'

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const placeholder = ref()

const dateValue = ref()
</script>

<template>
  <FormField v-slot="{ value, handleChange }" name="spayNeuterStatus">
    <FormItem class="flex flex-row items-center justify-between col-span-2 p-4 border rounded-none">
      <div class="flex flex-row items-center gap-4">
        <Icon icon="fa-solid:neuter" class="w-6 h-6" />
        <div class="space-y-0.5">
          <FormLabel class="text-base"> Neuter Status </FormLabel>
          <FormDescription> Is your pet neutered? </FormDescription>
        </div>
      </div>
      <FormControl>
        <Switch :checked="value" @update:checked="handleChange" />
      </FormControl>
    </FormItem>
  </FormField>
  <FormField v-slot="{ componentField }" name="microchipNumber">
    <FormItem v-auto-animate>
      <FormLabel>Microchip Number (optional)</FormLabel>
      <FormControl>
        <Input type="text" placeholder="000000000000000" v-bind="componentField" />
      </FormControl>
      <FormDescription>The microchip of the pet.</FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
  <FormField v-slot="{ value, setValue }" name="lastMedicalCheckup">
    <FormItem class="space-y-2" v-auto-animate>
      <FormLabel>Last Medical checkup (optional) </FormLabel>
      <Popover>
        <PopoverTrigger as-child>
          <FormControl>
            <Button
              variant="outline"
              :class="cn('w-full ps-3 text-start font-normal', !value && 'text-muted-foreground')"
            >
              <span>{{ dateValue ? df.format(toDate(dateValue)) : 'Pick a date' }}</span>
              <CalendarIcon class="w-4 h-4 opacity-50 ms-auto" />
            </Button>
            <input hidden />
          </FormControl>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar
            v-model:placeholder="placeholder"
            v-model="dateValue"
            calendar-label="Date of birth"
            initial-focus
            :min-value="new CalendarDate(1900, 1, 1)"
            :max-value="today(getLocalTimeZone())"
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
      <FormDescription> The date of the last medical checkup of the pet. </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
