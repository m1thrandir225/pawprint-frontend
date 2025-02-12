import type { ShelterPetListing } from '@/types/models/shelterPetListing'
import { Config } from '@/utils/config'
import { apiRequest, multipartApiRequest } from './api-service'
import type { CreateShelterListingDTO } from '@/types/dto/CreateShelterListingDTO'

const SHELTER_LISTING_API_URL = Config.apiURL + '/shelter-listings'

const shelterListingService = {
  getShelterListings: ({
    petSizeId,
    petTypeId,
    petGenderId,
    search,
  }: {
    petSizeId: string
    petTypeId: string
    petGenderId: string
    search: string
  }) =>
    apiRequest<ShelterPetListing[]>({
      url: SHELTER_LISTING_API_URL,
      method: 'GET',
      protected: true,
      params: {
        'pet-type': petTypeId,
        'pet-size': petSizeId,
        'pet-gender': petGenderId,
        search: search,
      },
    }),

  getShelterListing: (id: string, params?: Record<string, string>) =>
    apiRequest<ShelterPetListing>({
      url: `${SHELTER_LISTING_API_URL}/${id}`,
      method: 'GET',
      params: params,
    }),
  getListingsByShelter: ({
    shelterId,
    adoptionStatusId,
  }: {
    shelterId: string
    adoptionStatusId: string
  }) =>
    apiRequest<ShelterPetListing[]>({
      url: `${SHELTER_LISTING_API_URL}/shelter/${shelterId}`,
      method: 'GET',
      protected: true,
      params: { 'adoption-status': adoptionStatusId },
    }),
  deleteShelterListing: ({ id, userId }: { id: string; userId: string }) =>
    apiRequest<boolean>({
      url: `${SHELTER_LISTING_API_URL}/${id}`,
      method: 'DELETE',
      protected: true,
      data: {
        userId,
      },
    }),
  createShelterListing: (data: CreateShelterListingDTO) =>
    multipartApiRequest<CreateShelterListingDTO, string>({
      url: SHELTER_LISTING_API_URL,
      method: 'POST',
      data: data,
      protected: true,
    }),
  updateShelterListing: (id: string, data: Record<string, unknown>) =>
    multipartApiRequest<Record<string, unknown>, ShelterPetListing>({
      url: `${SHELTER_LISTING_API_URL}/${id}`,
      method: 'PUT',
      data: data,
      protected: true,
    }),
}

export default shelterListingService
