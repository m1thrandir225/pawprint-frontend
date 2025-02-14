import type { MedicalCondition } from './medicalCondition'
import type { Vaccination } from './vaccination'
import type { Veterinarian } from './veterinarian'

export type MedicalRecord = {
  id: string
  spayNeuterStatus: string
  lastMedicalCheckup: string | null
  microchipNumber: string | null
  createdAt: string
  veterinarian: Veterinarian
  medicalConditions?: MedicalCondition[]
  vaccinations: Vaccination[]
}
