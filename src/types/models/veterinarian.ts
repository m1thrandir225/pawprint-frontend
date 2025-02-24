import type { VeterinarianSpecialization } from './veterinarianSpecialization'

export type Veterinarian = {
  id: string
  name: string
  clinicName: string
  contactNumber: string
  email: string
  createdAt: string
  vetSpecializations: VeterinarianSpecialization[]
}
