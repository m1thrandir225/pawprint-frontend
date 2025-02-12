<template>
  <Form
    v-slot="{ meta, values, validate, errors }"
    as=""
    keep-values
    :initial-values="initialValues"
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
              onSubmit(values as CreateOwnerListingDTO)
            }
          }
        "
      >
        <pre>{{ errors }}</pre>
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

        <div class="grid px-16 mt-4 gap-y-2 gap-x-4 gird-cols-1 md:grid-cols-2">
          <template v-if="stepIndex === 1">
            <CreatePetForm
              :genders="genders"
              :sizes="sizes"
              :types="types"
              :health-statuses="healthStatuses"
              :max-image-size="MAX_IMAGE_SIZE"
            />
          </template>

          <template v-if="stepIndex === 2">
            <CreateOwnerDocumentsForm
              :surrender-reasons="ownerSurrenderReasons"
              :max-document-size="MAX_FILE_SIZE"
            />
          </template>
          <template v-if="stepIndex === 3">
            <CreateFeeForm />
          </template>
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
              @click="
                () => {
                  console.log(values)
                  meta.valid && nextStep()
                }
              "
            >
              Next
            </Button>
            <Button v-if="stepIndex === 3" size="sm" type="submit" :disabled="isPending">
              <Loader2 v-if="isPending" class="animate-spin" />
              <span v-else>Submit</span>
            </Button>
          </div>
        </div>
      </form>
    </Stepper>
  </Form>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
import type { PetGender } from '@/types/models/petGender'
import type { PetSize } from '@/types/models/petSize'
import type { PetType } from '@/types/models/petType'

import ownerPetListingService from '@/services/ownerPetListing-service'
import type { CreateOwnerListingDTO } from '@/types/dto/CreateOwnerListingDTO'
import type { HealthStatus } from '@/types/models/healthStatus'
import type { OwnerSurrenderReason } from '@/types/models/ownerSurrenderReason'
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { Check, Circle, Dot, Loader2 } from 'lucide-vue-next'
import { ref } from 'vue'
import * as z from 'zod'
import CreateFeeForm from './CreateFeeForm.vue'
import CreateOwnerDocumentsForm from './CreateOwnerDocumentsForm.vue'
import CreatePetForm from './CreatePetForm.vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

defineProps<{
  types: PetType[]
  sizes: PetSize[]
  genders: PetGender[]
  healthStatuses: HealthStatus[]
  ownerSurrenderReasons: OwnerSurrenderReason[]
}>()

const router = useRouter()

const MAX_FILE_SIZE = 50000000
const MAX_IMAGE_SIZE = 5000000

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const ACCEPTED_FILE_TYPES = [
  'application/msword',
  'application/vnd.oasis.opendocument.text',
  'application/pdf',
  'application/rtf',
  'text/plain',
]

const formSchema = [
  //Pet object
  z.object({
    name: z.string().min(2).max(50).nonempty(),
    breed: z.string().min(2).max(50).nonempty(),
    avatarImg: z
      .custom<File>()
      .refine((file) => file, 'An image is required.')
      .refine(
        (file) => file && file.size <= MAX_IMAGE_SIZE,
        `File must be less than or equal to 5MB.`,
      )
      .refine(
        (file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Only .jpg, .jpeg, .png, and .webp files are accepted.',
      ),
    imageShowcase: z
      .custom<FileList>() // Use FileList for HTML file input
      .refine((files) => files && files?.length > 0, 'At least one image is required.')
      .refine((files) => files && files?.length <= 10, 'You can upload a maximum of 10 files.')
      .refine((files) => {
        if (!files) return false
        return Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE)
      }, `Each file must be less than or equal to 5MB.`)
      .refine(
        (files) => {
          if (!files) return false
          return Array.from(files).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type))
        },
        `Only ${ACCEPTED_IMAGE_TYPES.join(', ')} files are accepted.`,
      ),
    ageYears: z.coerce.number().min(0).max(100),
    petTypeId: z.string(),
    petGenderId: z.string(),
    petSizeId: z.string(),
    healthStatusId: z.string(),
    goodWithChildren: z.boolean().default(false),
    goodWithDogs: z.boolean().default(false),
    goodWithCats: z.boolean().default(false),
    energyLevel: z.coerce.number().min(1).max(5),
    specialRequirements: z.string().nullable().default(null),
    behaviorialNotes: z.string().nullable().default(null),
  }),
  //Documents object
  z.object({
    surrenderReasonId: z.string(),
    documents: z
      .custom<FileList>() // Use FileList for HTML file input
      .refine((files) => files && files?.length > 0, 'At least one file is required.')
      .refine((files) => files && files?.length <= 20, 'You can upload a maximum of 20 files.')
      .refine((files) => {
        if (!files) return false
        return Array.from(files).every((file) => file.size <= MAX_FILE_SIZE)
      }, `Each file must be less than or equal to 50MB.`)
      .refine(
        (files) => {
          if (!files) return false
          return Array.from(files).every(
            (file) =>
              ACCEPTED_IMAGE_TYPES.includes(file.type) || ACCEPTED_FILE_TYPES.includes(file.type),
          )
        },
        `Only ${ACCEPTED_IMAGE_TYPES.join(', ')} and ${ACCEPTED_FILE_TYPES.join(', ')} files are accepted.`,
      ),
  }),
  //Fee object
  z.object({
    fee: z.number().min(0),
    feeCurrency: z.string().min(3).max(3),
  }),
]

const initialValues = {
  vaccinations: [],
  documents: [],
  goodWithCats: false,
  goodWithDogs: false,
  goodWithChildren: false,
  specialRequirements: null,
  behaviorialNotes: null,
  fee: 0,
  feeCurrency: 'MKD',
}

const stepIndex = ref(1)
const steps = [
  {
    step: 1,
    title: 'Pet Details',
    description: 'Enter your pet details',
  },
  {
    step: 2,
    title: 'Documents',
    description: 'Documents related to the Pet you are trying to list.',
  },
  {
    step: 3,
    title: 'Fee',
    description: 'Pricing Details',
  },
]

const { mutateAsync, isPending } = useMutation({
  mutationKey: ['createOwnerListing'],
  mutationFn: (input: CreateOwnerListingDTO) => ownerPetListingService.createListing(input),
  onSuccess: (data) => {
    router.replace({ name: 'ownerListing', params: { id: data } })
  },
  onError: (error) => {
    toast.error("Couldn't create the listing. Error: " + error.message)
  },
})

async function onSubmit(values: CreateOwnerListingDTO) {
  await mutateAsync(values)
}
</script>

<style scoped></style>
