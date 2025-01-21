import { Config } from '@/utils/config'
import { apiRequest } from './api-service'
import type { Adoption } from '@/types/models/adoption'

const ADOPTION_API_URL = Config.apiURL + '/adoptions'

const adoptionService = {
  getAdoptions: () =>
    apiRequest<Adoption[]>({
      url: ADOPTION_API_URL,
      method: 'GET',
      protected: true,
    }),
}

export default adoptionService
