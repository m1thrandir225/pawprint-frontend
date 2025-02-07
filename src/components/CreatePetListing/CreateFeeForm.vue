<template>
  <FormField v-slot="{ componentField }" name="fee">
    <FormItem v-auto-animate>
      <FormLabel>Fee Price</FormLabel>
      <FormControl>
        <Input type="number" placeholder="200" v-bind="componentField" />
      </FormControl>
      <FormDescription> The fee for the adoption </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
  <FormField v-slot="{ componentField }" name="feeCurrency">
    <FormItem v-auto-animate>
      <FormLabel>Fee Currency</FormLabel>
      <Select v-bind="componentField">
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select the type of your pet" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="MKD"> MKD </SelectItem>
            <SelectItem value="USD"> USD </SelectItem>
            <SelectItem value="EUR"> EUR </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormDescription> The currency in which the fee is listed </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
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
</script>
