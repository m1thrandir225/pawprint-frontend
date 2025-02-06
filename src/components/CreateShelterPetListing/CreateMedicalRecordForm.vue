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

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const placeholder = ref()

const dateValue = ref()
</script>

<template>
  <FormField v-slot="{ componentField }" name="spayNeuterStatus">
    <FormItem v-auto-animate>
      <FormLabel>Name</FormLabel>
      <FormControl>
        <Input type="text" placeholder="Iris" v-bind="componentField" />
      </FormControl>
      <FormDescription> The pet's name </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
  <FormField v-slot="{ componentField }" name="lastMedicalCheckup">
    <FormItem v-auto-animate>
      <FormLabel>Name</FormLabel>
      <FormControl>
        <Input type="text" placeholder="Iris" v-bind="componentField" />
      </FormControl>
      <FormDescription> The pet's name </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
  <FormField v-slot="{ componentField, value, setValue }" name="microchipNumber">
    <FormItem v-auto-animate>
      <FormLabel>Microchip Number</FormLabel>
      <Popover>
        <PopoverTrigger as-child>
          <FormControl>
            <Button
              variant="outline"
              :class="
                cn('w-[240px] ps-3 text-start font-normal', !value && 'text-muted-foreground')
              "
            >
              <span>{{ value ? df.format(toDate(value)) : 'Pick a date' }}</span>
              <CalendarIcon class="w-4 h-4 opacity-50 ms-auto" />
            </Button>
            <input hidden v-bind="componentField" />
          </FormControl>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar
            v-model:placeholder="placeholder"
            v-model:model-value="dateValue"
            calendar-label="Date of birth"
            initial-focus
            :min-value="new CalendarDate(1900, 1, 1)"
            :max-value="today(getLocalTimeZone())"
            @update:model-value="
              (v) => {
                if (v) {
                  setValue(dateValue.toString())
                } else {
                  setValue(undefined)
                }
              }
            "
          />
        </PopoverContent>
      </Popover>
      <FormDescription> The pet's name </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
