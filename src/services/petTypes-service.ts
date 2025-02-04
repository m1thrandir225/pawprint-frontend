import { Config } from '@/utils/config'
import { apiRequest } from './api-service'
import type { PetType } from '@/types/models/petType'

const PET_TYPES_URL = Config.apiURL + '/pet-types'

const petTypesService = {
  getPetTypes: () => apiRequest<PetType[]>({ url: PET_TYPES_URL, method: 'GET', protected: true }),
  createPetType: ({ name }: { name: string }) =>
    apiRequest<PetType>({
      url: PET_TYPES_URL,
      method: 'POST',
      protected: true,
      data: { name },
    }),
  updatePetType: ({ id, name }: { id: string; name: string }) =>
    apiRequest<PetType>({
      url: `${PET_TYPES_URL}/${id}`,
      method: 'PUT',
      protected: true,
      data: { name },
    }),
  deletePetType: ({ id }: { id: string }) =>
    apiRequest<boolean>({
      url: `${PET_TYPES_URL}/${id}`,
      method: 'DELETE',
      protected: true,
    }),
}

export default petTypesService
