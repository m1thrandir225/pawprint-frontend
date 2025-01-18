import type { BuildRequest } from '@/types/api'
import type { PetSize } from '@/types/models/petSize'

const all = (): BuildRequest<PetSize[]> => {
  return {
    url: '/pet-sizes',
    options: {
      method: 'GET',
    },
  }
}

export default {
  all,
}
