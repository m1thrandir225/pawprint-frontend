<template>
  <FormField v-slot="{ componentField }" name="surrenderReasonId">
    <FormItem v-auto-animate class="w-full col-span-2 my-4">
      <FormLabel>Surrender Reason</FormLabel>
      <Select v-bind="componentField">
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select the type of your pet" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="reason in surrenderReasons" :value="reason.id" :key="reason.id">
              {{ reason.description }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormDescription> The reason you are listing your pet. </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
  <FormField v-slot="{ handleBlur, handleChange, value, setValue }" name="documents">
    <Card class="w-full col-span-2 rounded-lg">
      <CardHeader>
        <div class="flex flex-row items-center justify-between">
          <div class="flex flex-col gap-2">
            <CardTitle> Pet Documents </CardTitle>
            <CardDescription> Additional documents for the listing </CardDescription>
          </div>

          <Button
            v-if="value && value.length > 0"
            size="icon"
            variant="outline"
            @click="triggerAddFileInput"
          >
            <Plus class="w-8 h-8" />
          </Button>
          <input
            ref="addImageInputRef"
            type="file"
            accept="image/*, .pdf, .doc, .docx"
            @change="
              (e: Event) => {
                const files = (e.target as HTMLInputElement).files

                if (files && files.length > 0) {
                  const newImages = [...value, ...files]
                  setValue(newImages, true)
                }
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
                v-for="document in value"
                :key="document"
                class="flex flex-row items-center justify-between p-4 border rounded-lg"
                :class="{ 'bg-red-200': document.size > maxDocumentSize }"
              >
                <img
                  v-if="document.type.includes('image')"
                  :src="createURLPreview(document)"
                  alt="Pet Avatar"
                  class="object-cover w-24 h-24 rounded-sm"
                />
                <p v-else>{{ document.name }}</p>
                <Button
                  size="icon"
                  variant="outline"
                  @click="
                    () => {
                      const withoutDocument = value.filter((file: File) => file !== document)
                      setValue(withoutDocument, true)
                    }
                  "
                >
                  <Trash class="w-6 h-6" />
                </Button>
              </div>
            </div>
            <FormControl>
              <Input
                type="file"
                accept="image/*, .pdf, .doc, .docx"
                multiple
                @change="handleChange"
                @blur="handleBlur"
                :class="{
                  hidden: value && value.length > 0,
                }"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
      </CardContent>
    </Card>
  </FormField>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Plus, Trash } from 'lucide-vue-next'
import { Input } from '../ui/input'
import type { OwnerSurrenderReason } from '@/types/models/ownerSurrenderReason'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

defineProps<{
  surrenderReasons: OwnerSurrenderReason[]
  maxDocumentSize: number
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
