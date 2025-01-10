import type { Veterinarian } from './veterinarian'

export type VeterinarianSpecialization = {
  id: string
  specialization: string
  veterinarian: Veterinarian
}
