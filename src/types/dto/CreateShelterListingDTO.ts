import type { MedicalConditionDTO } from './MedicalConditionDTO'
import type { VaccinationDTO } from './VaccinationDTO'

export type CreateShelterListingDTO = {
  name: string
  breed: string
  ageYears: number
  petTypeId: string
  petSizeId: string
  petGenderId: string
  healthStatusId: string
  goodWithChildren: boolean
  goodWithDogs: boolean
  goodWithCats: boolean
  energyLevel: number
  specialRequirements?: string
  behaviorialNotes?: string
  intakeDate?: string
  veterinarianName: string
  veterinarianContactNumber: string
  veterinarianClinicName: string
  veterinarianEmail: string
  veterinarianSpecializations: string[]
  spayNeuterStatus: boolean
  lastMedicalCheckup?: string
  microchipNumber?: string
  medicalConditions?: MedicalConditionDTO[]
  vaccinations: VaccinationDTO[]
  fee: number
  feeCurrency: string
  imageShowcase: File[]
  avatarImg: File
}
