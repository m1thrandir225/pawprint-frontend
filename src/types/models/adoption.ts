import type { Pet } from './pet'
import type { User } from './user'

export const Approved = {
  0: 'Approved',
  1: 'Pending',
  2: 'Rejected',
}
export type Adoption = {
  id: string
  pet: Pet
  adopter: User
  adoptionDate?: string
  followUpDate?: string
  counselorNotes?: string
  approved: 0 | 1 | 2
  createdAt: string
}
