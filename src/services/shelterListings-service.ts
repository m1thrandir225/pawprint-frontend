import { Config } from '@/utils/config'
import type { ShelterPetListing } from '@/types/models/shelterPetListing'
import { apiRequest } from './api-service'

const SHELTER_LISTING_API_URL = Config.apiURL + '/shelter-listings'

const shelterListingService = {
  getShelterListings: () =>
    apiRequest<ShelterPetListing[]>({
      url: SHELTER_LISTING_API_URL,
      method: 'GET',
      protected: true,
    }),

  getShelterListing: (id: string, params?: Record<string, string>) =>
    apiRequest<ShelterPetListing>({
      url: `${SHELTER_LISTING_API_URL}/${id}`,
      method: 'GET',
      params: params,
    }),
  getListingsByShelter: (shelterId: string) =>
    apiRequest<ShelterPetListing[]>({
      url: `${SHELTER_LISTING_API_URL}/shelter/${shelterId}`,
      method: 'GET',
      protected: true,
    }),
}

export default shelterListingService
