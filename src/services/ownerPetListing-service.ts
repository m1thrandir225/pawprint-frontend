import { Config } from '@/utils/config'
import { apiRequest } from './api-service'
import type { OwnerPetListing } from '@/types/models/ownerPetListing'

const OWNER_PETLISTING_API_URL = Config.apiURL + '/owner-pet-listings'

const ownerPetListingService = {
  getOwnerPetListings: () =>
    apiRequest<OwnerPetListing[]>({
      url: OWNER_PETLISTING_API_URL,
      method: 'GET',
      protected: true,
    }),
  getOwnerPetListing: (id: string, params?: Record<string, string>) =>
    apiRequest<OwnerPetListing>({
      url: `${OWNER_PETLISTING_API_URL}/${id}`,
      method: 'GET',
      protected: true,
      params: params,
    }),
  getListingsByOwner: (ownerId: string) =>
    apiRequest<OwnerPetListing[]>({
      url: `${OWNER_PETLISTING_API_URL}/owner/${ownerId}`,
      method: 'GET',
      protected: true,
    }),
}

export default ownerPetListingService
