<script setup lang="ts">
import DefaultContainer from '@/components/Global/DefaultContainer.vue'
import DefaultHeader from '@/components/Global/DefaultHeader.vue'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'

import { toTypedSchema } from '@vee-validate/zod'
import { Check, Circle, Dot } from 'lucide-vue-next'
import { ref } from 'vue'
import * as z from 'zod'

const formSchema = [
  z.object({
    name: z.string().min(2).max(50),
    breed: z.string().min(2).max(50).nullable().default(null),
    avatarImg: z.string(),
    imageShowcase: z.array(z.string()),
    ageYears: z.number().int().min(1).max(100),
    petTypeId: z.string(),
    petGenderId: z.string(),
    petSizeId: z.string(),
    adoptionStatusId: z.string(),
    healthStatusId: z.string(),
    goodWithChildren: z.boolean(),
    goodWithDogs: z.boolean(),
    goodWithCats: z.boolean(),
    energyLevel: z.number().int().min(1).max(5),
    specialRequirements: z.string().nullable().default(null),
    behaviorialNotes: z.string().nullable().default(null),
    intakeDate: z.string().nullable().default(null),
  }),
  z.object({
    spayNeuterStatus: z.string(),
    lastMedicalCheckup: z.string().nullable().default(null),
    microchipNumber: z.string().nullable().default(null),
  }),
  z.object({
    veterinarianName: z.string().min(2).max(50),
    clinicName: z.string().min(2).max(50),
    contactNumber: z.string().min(2).max(50),
    email: z.string().email(),
    specializations: z.array(z.string()),
    medicalConditions: z.array(
      z.object({
        conditionName: z.string().min(2).max(100),
        notes: z.string().nullable().default(null),
      }),
    ),
    vaccinations: z.array(
      z.object({
        vaccinationName: z.string().min(2).max(100),
        vaccineDate: z.string().min(2).max(100),
      }),
    ),
  }),
]

const stepIndex = ref(1)
const steps = [
  {
    step: 1,
    title: 'Pet Details',
    description: 'Enter your pet details',
  },
  {
    step: 2,
    title: 'Medical Record',
    description: 'Enter your pet medical record',
  },
  {
    step: 3,
    title: 'Veterinarian',
    description: 'Enter your veterinarian details',
  },
]

function onSubmit(values: unknown) {
  console.log(values)
}
</script>

<template>
  <DefaultContainer>
    <DefaultHeader />
    <Form
      v-slot="{ meta, values, validate }"
      as=""
      keep-values
      :validation-schema="toTypedSchema(formSchema[stepIndex - 1])"
    >
      <Stepper
        v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
        v-model="stepIndex"
        class="block w-full"
      >
        <form
          @submit="
            (e) => {
              e.preventDefault()
              validate()

              if (stepIndex === steps.length && meta.valid) {
                onSubmit(values)
              }
            }
          "
        >
          <div class="flex w-full gap-2 flex-start">
            <StepperItem
              v-for="step in steps"
              :key="step.step"
              v-slot="{ state }"
              class="relative flex flex-col items-center justify-center w-full"
              :step="step.step"
            >
              <StepperSeparator
                v-if="step.step !== steps[steps.length - 1].step"
                class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
              />

              <StepperTrigger as-child>
                <Button
                  :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                  size="icon"
                  class="z-10 rounded-full shrink-0"
                  :class="[
                    state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background',
                  ]"
                  :disabled="state !== 'completed' && !meta.valid"
                >
                  <Check v-if="state === 'completed'" class="size-5" />
                  <Circle v-if="state === 'active'" />
                  <Dot v-if="state === 'inactive'" />
                </Button>
              </StepperTrigger>

              <div class="flex flex-col items-center mt-5 text-center">
                <StepperTitle
                  :class="[state === 'active' && 'text-primary']"
                  class="text-sm font-semibold transition lg:text-base"
                >
                  {{ step.title }}
                </StepperTitle>
                <StepperDescription
                  :class="[state === 'active' && 'text-primary']"
                  class="text-xs transition sr-only text-muted-foreground md:not-sr-only lg:text-sm"
                >
                  {{ step.description }}
                </StepperDescription>
              </div>
            </StepperItem>
          </div>

          <div class="flex flex-col gap-4 mt-4">
            <template v-if="stepIndex === 1"> </template>

            <template v-if="stepIndex === 2"> </template>

            <template v-if="stepIndex === 3"> </template>
          </div>

          <div class="flex items-center justify-between mt-4">
            <Button :disabled="isPrevDisabled" variant="outline" size="sm" @click="prevStep()">
              Back
            </Button>
            <div class="flex items-center gap-3">
              <Button
                v-if="stepIndex !== 3"
                :type="meta.valid ? 'button' : 'submit'"
                :disabled="isNextDisabled"
                size="sm"
                @click="meta.valid && nextStep()"
              >
                Next
              </Button>
              <Button v-if="stepIndex === 3" size="sm" type="submit"> Submit </Button>
            </div>
          </div>
        </form>
      </Stepper>
    </Form>
  </DefaultContainer>
</template>
