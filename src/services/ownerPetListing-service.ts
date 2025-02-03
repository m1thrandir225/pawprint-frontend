import { Config } from '@/utils/config'
import { apiRequest } from './api-service'
import type { OwnerPetListing } from '@/types/models/ownerPetListing'

const OWNER_PETLISTING_API_URL = Config.apiURL + '/owner-pet-listings'

const ownerPetListingService = {
  getOwnerPetListings: ({
    petGenderId,
    petSizeId,
    petTypeId,
    search,
  }: {
    petTypeId: string
    petSizeId: string
    petGenderId: string
    search: string
  }) =>
    apiRequest<OwnerPetListing[]>({
      url: OWNER_PETLISTING_API_URL,
      method: 'GET',
      protected: true,
      params: {
        'pet-type': petTypeId,
        'pet-size': petSizeId,
        'pet-gender': petGenderId,
        search: search,
      },
    }),
  getOwnerPetListing: (id: string, params?: Record<string, string>) =>
    apiRequest<OwnerPetListing>({
      url: `${OWNER_PETLISTING_API_URL}/${id}`,
      method: 'GET',
      protected: true,
      params: params,
    }),
  getListingsByOwner: ({
    ownerId,
    adoptionStatusId,
  }: {
    ownerId: string
    adoptionStatusId: string
  }) =>
    apiRequest<OwnerPetListing[]>({
      url: `${OWNER_PETLISTING_API_URL}/owner/${ownerId}`,
      method: 'GET',
      protected: true,
      params: { 'adoption-status': adoptionStatusId },
    }),
  deleteOwnerPetListing: (id: string) =>
    apiRequest<boolean>({
      url: `${OWNER_PETLISTING_API_URL}/${id}`,
      method: 'DELETE',
      protected: true,
    }),
}

export default ownerPetListingService
