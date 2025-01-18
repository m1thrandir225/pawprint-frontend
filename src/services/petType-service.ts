import type { BuildRequest } from '@/types/api'
import type { PetType } from '@/types/models/petType'

const all = (): BuildRequest<PetType[]> => {
  return {
    url: '/pet-types',
    options: {
      method: 'GET',
    },
  }
}

const single = (id: string): BuildRequest<PetType> => {
  return {
    url: `/pet-types/${id}`,
    options: {
      method: 'GET',
    },
  }
}

export default {
  all,
  single,
}
