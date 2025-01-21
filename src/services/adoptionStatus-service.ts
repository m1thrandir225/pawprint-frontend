import { Config } from '@/utils/config'
import { apiRequest } from './api-service'
import type { AdoptionStatus } from '@/types/models/adoptionStatus'

const ADOPTION_STATUS_API_URL = Config.apiURL + '/adoption-statuses'

const adoptionStatusService = {
  getAdoptionStatuses: () =>
    apiRequest<AdoptionStatus[]>({
      url: ADOPTION_STATUS_API_URL,
      method: 'GET',
      protected: true,
    }),
}

console.log('Adoption Status API URL:', ADOPTION_STATUS_API_URL);

export default adoptionStatusService;
