import type { PetSize } from '@/types/models/petSize'
import { apiRequest } from './api-service'
import { Config } from '@/utils/config'

const PET_SIZES_URL = Config.apiURL + '/pet-sizes'

const petSizesService = {
  getPetSizes: () => apiRequest<PetSize[]>({ url: PET_SIZES_URL, method: 'GET', protected: true }),
  createPetSize: ({ name }: { name: string }) =>
    apiRequest<PetSize>({
      url: PET_SIZES_URL,
      method: 'POST',
      protected: true,
      data: { name },
    }),
  updatePetSize: ({ id, name }: { id: string; name: string }) =>
    apiRequest<PetSize>({
      url: `${PET_SIZES_URL}/${id}`,
      method: 'PUT',
      protected: true,
      data: { name },
    }),
  deletePetSize: ({ id }: { id: string }) =>
    apiRequest<boolean>({
      url: `${PET_SIZES_URL}/${id}`,
      method: 'DELETE',
      protected: true,
    }),
}

export default petSizesService
