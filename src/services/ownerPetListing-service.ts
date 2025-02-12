import { Config } from '@/utils/config'
import { apiRequest, multipartApiRequest } from './api-service'
import type { OwnerPetListing } from '@/types/models/ownerPetListing'
import type { CreateOwnerListingDTO } from '@/types/dto/CreateOwnerListingDTO'

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
  deleteOwnerPetListing: ({ id, userId }: { id: string; userId: string }) =>
    apiRequest<boolean>({
      url: `${OWNER_PETLISTING_API_URL}/${id}`,
      method: 'DELETE',
      protected: true,
      data: {
        userId,
      },
    }),
  createListing: (input: CreateOwnerListingDTO) =>
    multipartApiRequest<CreateOwnerListingDTO, string>({
      url: OWNER_PETLISTING_API_URL,
      method: 'POST',
      protected: true,
      data: input,
    }),
}

export default ownerPetListingService
