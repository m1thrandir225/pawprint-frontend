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
}

export default ownerPetListingService;
