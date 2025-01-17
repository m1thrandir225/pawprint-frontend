import type { BuildRequest } from '@/types/api'

const all = (): BuildRequest => {
  return {
    url: '/pet-types',
    options: {
      method: 'GET',
    },
  }
}

const single = (id: string): BuildRequest => {
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
