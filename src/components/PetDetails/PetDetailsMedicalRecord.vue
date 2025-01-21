<template>
  <div class="flex flex-col items-start w-full gap-2 font-generalSans text-foreground">
    <Card class="w-full rounded-none border-accent">
      <CardHeader>
        <CardTitle>Veterinarian</CardTitle>
        <CardDescription>
          Information about the veterinarian that is responsible for the pet's health.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h1>
          <span class="font-semibold text-accent">Veterinarian E-Mail:</span>
          {{ medicalRecord.veterinarian.email }}
        </h1>
        <h1>
          <span class="font-semibold text-accent">Clinic Name:</span>
          {{ medicalRecord.veterinarian.clinicName }}
        </h1>
        <h1>
          <span class="font-semibold text-accent">Clinic Contact Number:</span>
          {{ medicalRecord.veterinarian.contactNumber }}
        </h1>
        <h1>
          <span class="font-semibold text-accent">Neuter status:</span>
          {{ capitalizeFirstLetter(medicalRecord.spayNeuterStatus.toString()) }}
        </h1>
        <h1 v-if="medicalRecord.lastMedicalCheckup" class="text-foreground">
          Last medical checkup: {{ medicalRecord.lastMedicalCheckup }}
        </h1>
        <h1 class="font-semibold text-accent">Specializations:</h1>
        <ol class="list-disc list-inside">
          <li v-if="!medicalRecord.veterinarian.vetSpecializations.length">No specializations</li>
          <li
            v-else
            v-for="specialization in medicalRecord.veterinarian.vetSpecializations"
            :key="specialization.id"
          >
            {{ specialization.specialization }}
          </li>
        </ol>
      </CardContent>
    </Card>

    <Card class="w-full rounded-none border-accent">
      <CardHeader>
        <CardTitle>Medical Conditions</CardTitle>
        <CardDescription> Information about the pet's medical conditions. </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" class="w-full" collapsible>
          <AccordionItem
            v-for="condition in medicalRecord.medicalConditions"
            :key="condition.id"
            :value="condition.conditionName"
          >
            <AccordionTrigger class="text-left">{{ condition.conditionName }}</AccordionTrigger>
            <AccordionContent>
              {{ condition.notes }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
    <Card class="w-full rounded-none border-accent">
      <CardHeader>
        <CardTitle> Vacinations </CardTitle>
        <CardDescription> Information about the pet's vaccinations. </CardDescription>
      </CardHeader>
      <CardContent>
        <p
          class="text-accent"
          v-for="vaccination in medicalRecord.vaccinations"
          :key="vaccination.id"
        >
          {{ capitalizeFirstLetter(vaccination.vaccineName) }} - {{ vaccination.vaccineDate }}
        </p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { MedicalRecord } from '@/types/models/medicalRecord'
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from '../ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { capitalizeFirstLetter } from '@/lib/utils'

defineProps<{ medicalRecord: MedicalRecord }>()
</script>
