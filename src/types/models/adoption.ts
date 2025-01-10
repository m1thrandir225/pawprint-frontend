import type { Pet } from './pet'
import type { User } from './user'

export type Adoption = {
  id: string
  pet: Pet
  adopter: User
  adoptionDate: string
  adoptionFee: number
  followUpDate: string
  counselorNotes: string
  isSuccessful: string
  createdAt: string
}
