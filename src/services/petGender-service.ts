import { Config } from '@/utils/config'
import { apiRequest } from './api-service'
import type { PetGender } from '@/types/models/petGender'

const PET_GENDERS_URL = Config.apiURL + '/pet-genders'

const petGendersService = {
  getPetGenders: () =>
    apiRequest<PetGender[]>({
      url: PET_GENDERS_URL,
      method: 'GET',
      protected: true,
    }),
}

export default petGendersService
