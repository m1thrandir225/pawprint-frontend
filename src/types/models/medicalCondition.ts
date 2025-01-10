import type { MedicalRecord } from './medicalRecord'

export type MedicalCondition = {
  id: string
  medicalRecord: MedicalRecord
  conditionName: string
  notes: string | null
}
