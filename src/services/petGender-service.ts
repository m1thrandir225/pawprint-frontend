import { Config } from '@/utils/config'
import { api } from './api-service'
import type { PetGender } from '@/types/models/petGender'

const PET_GENDERS_URL = Config.apiURL + '/pet-genders'

const petGendersService = {
  getPetGenders: () =>
    api<PetGender[]>({
      url: PET_GENDERS_URL,
      method: 'GET',
    }),
}

export default petGendersService
