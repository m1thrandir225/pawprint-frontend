import type { PetSize } from '@/types/models/petSize'
import { api } from './api-service'
import { Config } from '@/utils/config'

const PET_SIZES_URL = Config.apiURL + '/pet-sizes'

const petSizesService = {
  getPetSizes: () => api<PetSize[]>({ url: PET_SIZES_URL, method: 'GET' }),
}

export default petSizesService
