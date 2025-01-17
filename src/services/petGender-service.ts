import type { BuildRequest } from '@/types/api'

const all = (): BuildRequest => {
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
