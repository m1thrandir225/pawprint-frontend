import { Config } from '@/utils/config'
import { apiRequest } from './api-service'
import type { PetType } from '@/types/models/petType'

const PET_TYPES_URL = Config.apiURL + '/pet-types'

const petTypesService = {
  getPetTypes: () => apiRequest<PetType[]>({ url: PET_TYPES_URL, method: 'GET', protected: true }),
}

export default petTypesService
