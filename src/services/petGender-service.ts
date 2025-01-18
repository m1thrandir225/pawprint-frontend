import type { BuildRequest } from '@/types/api'
import type { PetGender } from '@/types/models/petGender'

const all = (): BuildRequest<PetGender[]> => {
  return {
    url: '/pet-genders',
    options: {
      method: 'GET',
    },
  }
}

export default {
  all,
}
