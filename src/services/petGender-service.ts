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
  createPetGender: ({ name }: { name: string }) =>
    apiRequest<PetGender>({
      url: PET_GENDERS_URL,
      method: 'POST',
      protected: true,
      data: { name },
    }),
  updatePetGender: ({ id, name }: { id: string; name: string }) =>
    apiRequest<PetGender>({
      url: `${PET_GENDERS_URL}/${id}`,
      method: 'PUT',
      protected: true,
      data: { name },
    }),
  deletePetGender: ({ id }: { id: string }) =>
    apiRequest<PetGender>({
      url: `${PET_GENDERS_URL}/${id}`,
      method: 'DELETE',
      protected: true,
    }),
}

export default petGendersService
