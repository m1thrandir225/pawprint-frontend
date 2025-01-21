<template>
  <div
    class="flex flex-col items-start w-full gap-2 p-2 border border-accent font-generalSans text-foreground"
  >
    <div class="flex items-center w-full space-x-4">
      <ClipboardPlus class="text-accent" />
      <span class="font-semibold text-accent">Medical Record</span>
    </div>

    <div class="flex flex-col w-full h-full gap-4">
      <h1>
        <span class="font-semibold text-accent">Veterinarian:</span>
        {{ medicalRecord.veterinarian.name }}
      </h1>
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
        {{ medicalRecord.spayNeuterStatus }}
      </h1>
      <h1 v-if="medicalRecord.lastMedicalCheckup" class="text-foreground">
        Last medical checkup: {{ medicalRecord.lastMedicalCheckup }}
      </h1>
      <h1 class="font-semibold text-accent">Specializations:</h1>
      <div class="flex flex-col gap-2">
        <div
          class="p-2 bg-primary/50"
          v-for="specialization in medicalRecord.veterinarian.vetSpecializations"
          :key="specialization.id"
        >
          <p class="text-primary-foreground">{{ specialization.specialization }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MedicalRecord } from '@/types/models/medicalRecord'
import { ClipboardPlus } from 'lucide-vue-next'

defineProps<{ medicalRecord: MedicalRecord }>()
</script>
