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
import { Textarea } from '../ui/textarea'
import { CalendarIcon, Plus, Trash } from 'lucide-vue-next'
import { ScrollArea } from '../ui/scroll-area'

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const placeholder = ref()

const dateValue = ref()

const vaccineDateValue = ref()
const vaccineDatePlaceholder = ref()

const medicalCondition = ref<string>('')
const medicalConditionNote = ref<string | undefined>(undefined)

const vaccination = ref<string>('')
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
  <div class="flex flex-col w-full gap-4">
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
    <div class="flex flex-col items-start gap-4 p-4 border">
      <FormField v-slot="{ value, setValue }" name="vaccinations">
        <div>
          <FormLabel> Vaccinations </FormLabel>
          <FormDescription> The pet's vaccinations </FormDescription>
        </div>
        <FormItem class="flex items-center justify-between w-full gap-4 space-y-0">
          <div class="flex flex-col w-full gap-4">
            <Input v-model="vaccination" type="text" placeholder="Vaccinaction Name" />
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    :class="
                      cn(
                        'w-full ps-3 text-start font-normal',
                        !vaccineDateValue && 'text-muted-foreground',
                      )
                    "
                  >
                    <span>{{
                      vaccineDateValue ? df.format(toDate(vaccineDateValue)) : 'Vaccination Date'
                    }}</span>
                    <CalendarIcon class="w-4 h-4 opacity-50 ms-auto" />
                  </Button>
                  <input hidden />
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar
                  v-model:placeholder="vaccineDatePlaceholder"
                  v-model="vaccineDateValue"
                  calendar-label="Vaccination Date"
                  initial-focus
                  :min-value="new CalendarDate(1900, 1, 1)"
                  :max-value="today(getLocalTimeZone())"
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button
            size="icon"
            variant="outline"
            class="rounded-none"
            :disabled="vaccination.length === 0"
            @click="
              () => {
                if (vaccination !== '' && vaccineDateValue) {
                  setValue(
                    value
                      ? [
                          ...value,
                          {
                            name: vaccination,
                            date: df.format(toDate(vaccineDateValue)).toString(),
                          },
                        ]
                      : [
                          {
                            name: vaccination,
                            date: df.format(toDate(vaccineDateValue)).toString(),
                          },
                        ],
                  )
                  vaccination = ''
                  vaccineDateValue = undefined
                }
              }
            "
          >
            <Plus />
          </Button>
        </FormItem>

        <ScrollArea v-if="value.length > 0" class="w-full h-[250px] px-4">
          <div v-for="vaccine in value" :key="vaccine.name">
            <div class="flex items-center justify-between w-full">
              <div>
                <p>{{ vaccine.name }}</p>
                <p>{{ vaccine.date }}</p>
              </div>
              <Button
                size="icon"
                class="rounded-none"
                variant="destructive"
                @click="() => setValue(value.filter((v: any) => v !== vaccine))"
              >
                <Trash />
              </Button>
            </div>
          </div>
        </ScrollArea>
        <FormMessage />
      </FormField>
    </div>
  </div>
  <div class="flex flex-col w-full gap-4">
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
                <span>{{ dateValue ? df.format(toDate(dateValue)) : 'Medical Checkup Date' }}</span>
                <CalendarIcon class="w-4 h-4 opacity-50 ms-auto" />
              </Button>
              <input hidden />
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar
              v-model:placeholder="placeholder"
              v-model="dateValue"
              calendar-label="Last Medical Checkup Date"
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
    <div class="flex flex-col items-start gap-4 p-4 border">
      <FormField v-slot="{ value, setValue }" name="medicalConditions">
        <div>
          <FormLabel> Medical Conditions (Optional) </FormLabel>
          <FormDescription> Current medical conditions </FormDescription>
        </div>
        <FormItem class="flex items-center justify-between w-full gap-4 space-y-0">
          <div class="flex flex-col w-full gap-2">
            <Input v-model="medicalCondition" type="text" placeholder="Medical Condition" />
            <Textarea
              v-model="medicalConditionNote"
              type="text"
              class="w-full"
              placeholder="Additional Notes (Optional)"
            />
          </div>
          <Button
            size="icon"
            variant="outline"
            class="rounded-none"
            :disabled="medicalCondition.length === 0"
            @click="
              () => {
                if (medicalCondition !== '') {
                  setValue(
                    value
                      ? [
                          ...value,
                          {
                            conditionName: medicalCondition,
                            note: medicalConditionNote ? medicalConditionNote : null,
                          },
                        ]
                      : [
                          {
                            conditionName: medicalCondition,
                            note: medicalConditionNote ? medicalConditionNote : null,
                          },
                        ],
                  )
                  medicalCondition = ''
                  medicalConditionNote = undefined
                }
              }
            "
          >
            <Plus />
          </Button>
        </FormItem>
        <ScrollArea v-if="value && value.length > 0" class="w-full h-[250px] px-4">
          <div v-for="condition in value" :key="condition.medicalCondition">
            <div class="flex items-center justify-between w-full my-2">
              <div class="flex flex-col gap-1">
                <p class="text-base font-semibold">{{ condition.conditionName }}</p>
                <p class="text-sm text-muted-foreground">{{ condition.note }}</p>
              </div>
              <Button
                size="icon"
                variant="destructive"
                class="rounded-none"
                @click="
                  () => {
                    setValue(value.filter((v: any) => v !== condition))
                  }
                "
              >
                <Trash />
              </Button>
            </div>
          </div>
        </ScrollArea>
        <FormMessage />
      </FormField>
    </div>
  </div>
</template>
