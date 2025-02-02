import type { OwnerPetListingDocument } from './ownerPetListingDocument'
import type { OwnerSurrenderReason } from './ownerSurrenderReason'
import type { Pet } from './pet'
import type { User } from './user'

export type OwnerPetListing = {
  id: string
  adopter: User
  pet: Pet
  petId: string
  surrenderReason: OwnerSurrenderReason
  reviewDate: string
  submissionDate: string
  approvalStatus: number
  ownerPetListingDocuments: OwnerPetListingDocument[]
}
