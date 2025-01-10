import type { MedicalRecord } from './medicalRecord'

export type Vaccination = {
  id: string
  vaccineName: string
  vaccineDate: string
  medicalRecord: MedicalRecord
}
