<template>
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
            console.log(validate())

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

        <div class="grid px-16 mt-4 gap-y-2 gap-x-4 gird-cols-1 md:grid-cols-2">
          <template v-if="stepIndex === 1">
            <div class="flex flex-col w-full gap-4">
              <FormField v-slot="{ componentField }" name="name">
                <FormItem v-auto-animate>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Iris" v-bind="componentField" />
                  </FormControl>
                  <FormDescription> The pet's name </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="breed">
                <FormItem v-auto-animate>
                  <FormLabel>Breed</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Bulldog" v-bind="componentField" />
                  </FormControl>
                  <FormDescription>The pet's breed </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="ageYears">
                <FormItem v-auto-animate>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Example: 2" v-bind="componentField" />
                  </FormControl>
                  <FormDescription> The pet's age.</FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="energyLevel">
                <FormItem v-auto-animate>
                  <FormLabel>Energy Level</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Energy between 1-5" v-bind="componentField" />
                  </FormControl>
                  <FormDescription>
                    How would you describe the pet's energy levels. A number between 1-5
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="petTypeId">
                <FormItem v-auto-animate>
                  <FormLabel>Pet Type</FormLabel>
                  <Select v-bind="componentField">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the type of your pet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="type in types" :value="type.id" :key="type.id">
                          {{ type.name }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription> The type of pet you are listing </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="petSizeId">
                <FormItem v-auto-animate>
                  <FormLabel>Pet Size</FormLabel>
                  <Select v-bind="componentField">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the size of your pet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="size in sizes" :value="size.id" :key="size.id">
                          {{ size.name }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription> The size of pet you are listing </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="petGenderId">
                <FormItem v-auto-animate>
                  <FormLabel>Pet Gender</FormLabel>
                  <Select v-bind="componentField">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the gender of your pet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="gender in genders" :value="gender.id" :key="gender.id">
                          {{ gender.name }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription> The size of pet you are listing </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="specialRequirements">
                <FormItem>
                  <FormLabel>Special Requirements (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any special requirements for the pet"
                      class="h-10 resize-none"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormDescription> Special requirements specific to the pet </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="behavioralNotes">
                <FormItem>
                  <FormLabel>Behavioral Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any behavioral notes for the pet"
                      class="resize-none"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormDescription> Behavioral notes for the pet </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <div class="flex flex-col w-full gap-4">
              <FormField v-slot="{ handleBlur, handleChange, value }" name="avatarImg">
                <Card class="w-full rounded-none border-accent">
                  <CardHeader>
                    <CardTitle> Pet Avatar </CardTitle>
                    <CardDescription> The main image of the listing </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div class="flex flex-col gap-2">
                      <AspectRatio v-if="value" :ratio="16 / 9">
                        <img
                          :src="createURLPreview(value)"
                          alt="Pet Avatar"
                          class="object-cover w-full h-full rounded-md"
                        />
                      </AspectRatio>

                      <FormItem v-auto-animate>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            @change="handleChange"
                            @blur="handleBlur"
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                  </CardContent>
                </Card>
              </FormField>

              <FormField
                v-slot="{ handleBlur, handleChange, value, setValue }"
                name="imageShowcase"
              >
                <Card class="w-full rounded-none border-accent">
                  <CardHeader>
                    <div class="flex flex-row items-center justify-between">
                      <div class="flex flex-col gap-2">
                        <CardTitle> Image Showcase </CardTitle>
                        <CardDescription> Additional images for the listing </CardDescription>
                      </div>

                      <Button
                        v-if="value && value.length > 0"
                        size="sm"
                        variant="outline"
                        @click="triggerAddFileInput"
                      >
                        <Plus class="w-8 h-8" />
                      </Button>
                      <input
                        ref="addImageInputRef"
                        type="file"
                        accept="image/*"
                        @change="
                          (e: Event) => {
                            const files = (e.target as HTMLInputElement).files

                            if (files && files.length > 0) {
                              const newImages = [...value, ...files]
                              setValue(newImages, true)
                            }

                            console.log(value)
                          }
                        "
                        @blur="
                          (e: Event) => {
                            console.log('blur')
                          }
                        "
                        style="display: none"
                      />
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div class="flex flex-col gap-2">
                      <FormItem v-auto-animate>
                        <div v-if="value" class="flex flex-col w-full gap-2">
                          <div
                            v-for="image in value"
                            :key="image"
                            class="flex flex-row items-center justify-between p-4 border"
                          >
                            <img
                              :src="createURLPreview(image)"
                              alt="Pet Avatar"
                              class="object-cover w-24 h-24"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              @click="
                                () => {
                                  const withoutImage = value.filter((file: File) => file !== image)
                                  setValue(withoutImage, true)
                                }
                              "
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            multiple
                            @change="handleChange"
                            @blur="handleBlur"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  </CardContent>
                </Card>
              </FormField>

              <FormField v-slot="{ value, handleChange }" name="goodWithDogs">
                <FormItem class="flex flex-row items-center justify-between p-4 border rounded-lg">
                  <div class="flex flex-row items-center gap-4">
                    <Dog />
                    <div class="space-y-0.5">
                      <FormLabel class="text-base"> Good with Dogs </FormLabel>
                      <FormDescription> Is the pet usually good with dogs ? </FormDescription>
                    </div>
                  </div>
                  <FormControl>
                    <Switch :checked="value" @update:checked="handleChange" />
                  </FormControl>
                </FormItem>
              </FormField>
              <FormField v-slot="{ value, handleChange }" name="goodWithCats">
                <FormItem class="flex flex-row items-center justify-between p-4 border rounded-lg">
                  <div class="flex flex-row items-center gap-4">
                    <Cat class="w-6 h-6" />
                    <div class="space-y-0.5">
                      <FormLabel class="text-base"> Good with Cats </FormLabel>
                      <FormDescription> Is the pet usually good with cats ? </FormDescription>
                    </div>
                  </div>
                  <FormControl>
                    <Switch :checked="value" @update:checked="handleChange" />
                  </FormControl>
                </FormItem>
              </FormField>
              <FormField v-slot="{ value, handleChange }" name="goodWithChildren">
                <FormItem class="flex flex-row items-center justify-between p-4 border rounded-lg">
                  <div class="flex flex-row items-center gap-4">
                    <Baby />
                    <div class="space-y-0.5">
                      <FormLabel class="text-base"> Good with Children </FormLabel>
                      <FormDescription> Is the pet usually good with kids ? </FormDescription>
                    </div>
                  </div>
                  <FormControl>
                    <Switch :checked="value" @update:checked="handleChange" />
                  </FormControl>
                </FormItem>
              </FormField>
            </div>
          </template>

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
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
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
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import type { PetGender } from '@/types/models/petGender'
import type { PetSize } from '@/types/models/petSize'
import type { PetType } from '@/types/models/petType'

import { toTypedSchema } from '@vee-validate/zod'
import { Baby, Cat, Check, Circle, Dog, Dot, Plus } from 'lucide-vue-next'
import { ref } from 'vue'
import * as z from 'zod'
import { AspectRatio } from '../ui/aspect-ratio'

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const addImageInputRef = ref<HTMLInputElement | null>(null)

const triggerAddFileInput = () => {
  if (addImageInputRef.value) {
    console.log(addImageInputRef)
    addImageInputRef.value.click()
  }
}

const formSchema = [
  z.object({
    name: z.string().min(2).max(50),
    breed: z.string().min(2).max(50).nullable().default(null),
    avatarImg: z
      .any()
      .refine((files) => files?.length == 1, 'Image is required.')
      .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        '.jpg, .jpeg, .png and .webp files are accepted.',
      ),
    imageShowcase: z.array(
      z
        .custom<FileList>() // Use FileList for HTML file input
        .refine((files) => files?.length > 0, 'At least one image is required.')
        .refine((files) => files?.length <= 10, 'You can upload a maximum of 10 files.')
        .refine((files) => {
          return Array.from(files).every((file) => file.size <= MAX_FILE_SIZE)
        }, `Each file must be less than or equal to 5MB.`)
        .refine((files) => {
          return Array.from(files).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type))
        }, 'Only .jpg, .jpeg, .png, and .webp files are accepted.'),
    ),
    ageYears: z.coerce.number().gt(0).lt(100),
    petTypeId: z.string(),
    petGenderId: z.string(),
    petSizeId: z.string(),
    adoptionStatusId: z.string(),
    healthStatusId: z.string(),
    goodWithChildren: z.boolean().default(false),
    goodWithDogs: z.boolean().default(false),
    goodWithCats: z.boolean().default(false),
    energyLevel: z.coerce.number().gt(0).lt(6),
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

defineProps<{
  types: PetType[]
  sizes: PetSize[]
  genders: PetGender[]
}>()

const createURLPreview = (file: File) => {
  return URL.createObjectURL(file)
}

function onSubmit(values: unknown) {
  console.log(values)
}
</script>

<style scoped></style>
