import type { Pet } from '@/types/models/pet'
import { Config } from '@/utils/config'
import { apiRequest } from './api-service'

const PET_API_URL = Config.apiURL + '/pets'

const petService = {
  getPets: () =>
    apiRequest<Pet[]>({
      url: PET_API_URL,
      method: 'GET',
      protected: true,
    }),
  exportPets: () =>
    apiRequest<Blob>({
      url: PET_API_URL + '/csv',
      method: 'GET',
    }),
}
export default petService
