import type { OwnerPetListing } from './ownerPetListing'

export type OwnerPetListingDocument = {
  id: string
  listing: OwnerPetListing
  documentUrl: string
  documentType: string
  uploadedAt: string
}
