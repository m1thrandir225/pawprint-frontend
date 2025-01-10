import type { MedicalRecord } from './medicalRecord'
import type { Pet } from './pet'
import type { Shelter } from './shelter'

export type ShelterPetListing = {
  id: string
  pet: Pet
  medicalRecord: MedicalRecord
  shelter: Shelter
  intakeDate: string | null
  approvalStatus: number
}
