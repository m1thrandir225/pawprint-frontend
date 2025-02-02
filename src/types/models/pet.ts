import type { AdoptionStatus } from './adoptionStatus'
import type { HealthStatus } from './healthStatus'
import type { PetGender } from './petGender'
import type { PetSize } from './petSize'
import type { PetType } from './petType'

export type Pet = {
  id: string
  name: string
  breed: string | null
  avatarImg: string
  imageShowcase: string[]
  ageYears: number
  petType: PetType
  petGender: PetGender
  petSize: PetSize
  adoptionStatus: AdoptionStatus
  healthStatus: HealthStatus
  goodWithChildren: boolean
  goodWithCats: boolean
  goodWithDogs: boolean
  energyLevel: number
  specialRequirements: string | null
  behaviorialNotes: string | null
  intakeDate: string | null
}
