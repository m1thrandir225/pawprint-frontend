import type { PetSize } from '@/types/models/petSize'
import { apiRequest } from './api-service'
import { Config } from '@/utils/config'

const PET_SIZES_URL = Config.apiURL + '/pet-sizes'

const petSizesService = {
  getPetSizes: () => apiRequest<PetSize[]>({ url: PET_SIZES_URL, method: 'GET', protected: true }),
}

export default petSizesService
