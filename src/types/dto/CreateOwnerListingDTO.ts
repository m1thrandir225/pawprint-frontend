export type CreateOwnerListingDTO = {
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
  imageShowcase: File[]
  avatarImg: File
  surrenderReasonId: string
  documents: File[]
  fee: number
  feeCurrency: string
}
