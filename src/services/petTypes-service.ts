import { Config } from '@/utils/config'
import { api } from './api-service'
import type { PetType } from '@/types/models/petType'

const PET_TYPES_URL = Config.apiURL + '/pet-types'

const petTypesService = {
  getPetTypes: () => api<PetType[]>({ url: PET_TYPES_URL, method: 'GET' }),
}

export default petTypesService
