<template>
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
    <FormField v-slot="{ componentField }" name="healthStatusId">
      <FormItem v-auto-animate>
        <FormLabel>Health Status</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select the current health status of the pet" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="status in healthStatuses" :value="status.id" :key="status.id">
                {{ status.name }}
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
    <FormField v-slot="{ componentField }" name="behaviorialNotes">
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
      <Card class="w-full rounded-none">
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
                <Input type="file" accept="image/*" @change="handleChange" @blur="handleBlur" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        </CardContent>
      </Card>
    </FormField>

    <FormField v-slot="{ handleBlur, handleChange, value, setValue }" name="imageShowcase">
      <Card class="w-full rounded-none">
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
      <FormItem class="flex flex-row items-center justify-between p-4 border rounded-none">
        <div class="flex flex-row items-center gap-4">
          <Dog class="w-6 h-6" />
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
      <FormItem class="flex flex-row items-center justify-between p-4 border rounded-none">
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
      <FormItem class="flex flex-row items-center justify-between p-4 border rounded-none">
        <div class="flex flex-row items-center gap-4">
          <Baby class="w-6 h-6" />
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

<script setup lang="ts">
import { Baby, Cat, Dog, Plus } from 'lucide-vue-next'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Switch } from '../ui/switch'
import { ref } from 'vue'
import type { PetType } from '@/types/models/petType'
import type { PetSize } from '@/types/models/petSize'
import type { PetGender } from '@/types/models/petGender'
import { AspectRatio } from '../ui/aspect-ratio'
import type { HealthStatus } from '@/types/models/healthStatus'

defineProps<{
  types: PetType[]
  sizes: PetSize[]
  genders: PetGender[]
  healthStatuses: HealthStatus[]
}>()

const addImageInputRef = ref<HTMLInputElement | null>(null)

const triggerAddFileInput = () => {
  if (addImageInputRef.value) {
    console.log(addImageInputRef)
    addImageInputRef.value.click()
  }
}

const createURLPreview = (file: File) => {
  return URL.createObjectURL(file)
}
</script>
