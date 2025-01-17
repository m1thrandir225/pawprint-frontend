import type { BuildRequest } from '@/types/api'

const all = (): BuildRequest => {
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
