<template>
  <Form
    v-slot="{ meta, values, validate }"
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
              onSubmit(values as CreateShelterListingDTO)
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
            <CreateMedicalRecordForm />
          </template>

          <template v-if="stepIndex === 3">
            <CreateVeterinarianForm />
          </template>
          <template v-if="stepIndex === 4">
            <CreateFeeForm />
          </template>
        </div>

        <div class="flex items-center justify-between mt-4">
          <Button :disabled="isPrevDisabled" variant="outline" size="sm" @click="prevStep()">
            Back
          </Button>
          <div class="flex items-center gap-3">
            <Button
              v-if="stepIndex !== 4"
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
            <Button v-if="stepIndex === 4" size="sm" type="submit" :disabled="isPending">
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

import { toTypedSchema } from '@vee-validate/zod'
import { Check, Circle, Dot, Loader2 } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import * as z from 'zod'
import CreatePetForm from './CreatePetForm.vue'
import type { HealthStatus } from '@/types/models/healthStatus'
import CreateMedicalRecordForm from './CreateMedicalRecordForm.vue'
import CreateVeterinarianForm from './CreateVeterinarianForm.vue'
import CreateFeeForm from './CreateFeeForm.vue'
import { useMutation } from '@tanstack/vue-query'
import shelterListingService from '@/services/shelterListings-service'
import type { CreateShelterListingDTO } from '@/types/dto/CreateShelterListingDTO'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import type { ShelterPetListing } from '@/types/models/shelterPetListing'

const router = useRouter()

const { mutateAsync, isPending } = useMutation({
  mutationKey: ['createPetListing'],
  mutationFn: (input: CreateShelterListingDTO) => shelterListingService.createShelterListing(input),
  onSuccess: (data) => {
    router.push({ name: 'shelterListing', params: { id: data } })
  },
  onError: (error) => {
    toast.error("Couldn't create the listing. Error + " + error.message)
  },
})

const MAX_IMAGE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const formSchema = [
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
      .refine((files) => {
        if (!files) return false
        return Array.from(files).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type))
      }, 'Only .jpg, .jpeg, .png, and .webp files are accepted.'),
    ageYears: z.coerce.number().min(0).max(100),
    petTypeId: z.string(),
    petGenderId: z.string(),
    petSizeId: z.string(),
    healthStatusId: z.string(),
    goodWithChildren: z.boolean().default(false),
    goodWithDogs: z.boolean().default(false),
    goodWithCats: z.boolean().default(false),
    energyLevel: z.coerce.number().gt(0).lt(6),
    specialRequirements: z.string().nullable().default(null),
    behaviorialNotes: z.string().nullable().default(null),
  }),
  z.object({
    spayNeuterStatus: z.boolean(),
    lastMedicalCheckup: z.string().max(15).nullable().default(null),
    microchipNumber: z.string().nullable().default(null),
    medicalConditions: z
      .array(
        z.object({
          conditionName: z.string().min(2).max(100),
          notes: z.string().nullable().default(null),
        }),
      )
      .optional(),
    vaccinations: z.array(
      z.object({
        name: z.string().min(2).max(100),
        date: z.string().min(2).max(100),
      }),
    ),
  }),
  z.object({
    veterinarianName: z.string().min(2).max(50),
    veterinarianClinicName: z.string().min(2).max(50),
    veterinarianContactNumber: z.string().min(2).max(50),
    veterinarianEmail: z.string().email(),
    veterinarianSpecializations: z
      .array(z.string())
      .min(1, 'At least one specialization is required.'),
  }),
  z.object({
    fee: z.number().min(0),
    feeCurrency: z.string().min(3).max(3),
  }),
]

const stepIndex = ref(2)
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
  {
    step: 4,
    title: 'Fee',
    description: 'Pricing Details',
  },
]

const props = defineProps<{
  types: PetType[]
  sizes: PetSize[]
  genders: PetGender[]
  healthStatuses: HealthStatus[]
  initialListing?: ShelterPetListing
}>()

const initialValues = computed(() => {
  if (props.initialListing) {
    const listing = props.initialListing
    const pet = listing.pet
    const vaccinations = listing.medicalRecord.vaccinations.map((x) => ({
      name: x.vaccineName,
      date: x.vaccineDate,
    }))
    const medicalConditions = listing.medicalRecord.medicalConditions
    const veterinarian = listing.medicalRecord.veterinarian
    const veterinarianSpecializations = veterinarian.vetSpecializations.map((x) => x.specialization)
    return {
      name: pet.name,
      breed: pet.breed,
      avatarImg: null,
      imageShowcase: null,
      ageYears: pet.ageYears,
      petTypeId: pet.petType.id,
      petGenderId: pet.petGender.id,
      petSizeId: pet.petSize.id,
      healthStatusId: pet.healthStatus.id,
      goodWithChildren: pet.goodWithChildren,
      goodWithDogs: pet.goodWithDogs,
      goodWithCats: pet.goodWithCats,
      energyLevel: pet.energyLevel,
      specialRequirements: pet.specialRequirements,
      behaviorialNotes: pet.behaviorialNotes,
      microchipNumber: listing.medicalRecord.microchipNumber || null,
      spayNeuterStatus: listing.medicalRecord.spayNeuterStatus,
      lastMedicalCheckup: listing.medicalRecord.lastMedicalCheckup || null,
      veterinarianName: veterinarian.name,
      veterinarianClinicName: veterinarian.clinicName,
      veterinarianContactNumber: veterinarian.contactNumber,
      veterinarianEmail: veterinarian.email,
      medicalConditions: medicalConditions || [],
      vaccinations: vaccinations || [],
      veterinarianSpecializations: veterinarianSpecializations || [],
      fee: 0,
      feeCurrency: 'MKD',
    }
  }
  return {
    medicalConditions: [],
    vaccinations: [],
    veterinarianSpecializations: [],
    spayNeuterStatus: false,
    goodWithCats: false,
    goodWithChildren: false,
    goodWithDogs: false,
    fee: 0,
    feeCurrency: 'MKD',
  }
})

async function onSubmit(values: CreateShelterListingDTO) {
  await mutateAsync(values)
}
</script>

<style scoped></style>
