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
  createAdoptionStatus: ({ name }: { name: string }) =>
    apiRequest<AdoptionStatus>({
      url: ADOPTION_STATUS_API_URL,
      method: 'POST',
      protected: true,
      data: { name },
    }),
  updateAdoptionStatus: ({ id, name }: { id: string; name: string }) =>
    apiRequest<AdoptionStatus>({
      url: `${ADOPTION_STATUS_API_URL}/${id}`,
      method: 'PUT',
      protected: true,
      data: { name },
    }),
  deleteAdoptionStatus: ({ id }: { id: string }) =>
    apiRequest<AdoptionStatus>({
      url: `${ADOPTION_STATUS_API_URL}/${id}`,
      method: 'DELETE',
      protected: true,
    }),
}

export default adoptionStatusService
