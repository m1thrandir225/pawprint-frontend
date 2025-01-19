import { Config } from '@/utils/config'
import { api } from './api-service'
import type { ShelterPetListing } from '@/types/models/shelterPetListing'

const SHELTER_LISTING_API_URL = Config.apiURL + '/shelter-listings'

const shelterListingService = {
  getShelterListings: () =>
    api<ShelterPetListing[]>({
      url: SHELTER_LISTING_API_URL,
      method: 'GET',
    }),
  getShelterListing: (id: string) =>
    api<ShelterPetListing>({
      url: `${SHELTER_LISTING_API_URL}/${id}`,
      method: 'GET',
    }),
}

export default shelterListingService
