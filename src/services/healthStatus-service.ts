import { Config } from '@/utils/config'
import { apiRequest } from './api-service'
import type { HealthStatus } from '@/types/models/healthStatus'

const HEALTH_STATUS_API_URL = Config.apiURL + '/health-statuses'

const healthStatusService = {
  getHealthStatuses: () =>
    apiRequest<HealthStatus[]>({
      url: HEALTH_STATUS_API_URL,
      method: 'GET',
      protected: true,
    }),
  createHealthStatus: ({ name }: { name: string }) =>
    apiRequest<HealthStatus>({
      url: HEALTH_STATUS_API_URL,
      method: 'POST',
      protected: true,
      data: { name },
    }),
  updateHealthStatus: ({ id, name }: { id: string; name: string }) =>
    apiRequest<HealthStatus>({
      url: `${HEALTH_STATUS_API_URL}/${id}`,
      method: 'PUT',
      protected: true,
      data: { name },
    }),
  deleteHealthStatus: ({ id }: { id: string }) =>
    apiRequest<HealthStatus>({
      url: `${HEALTH_STATUS_API_URL}/${id}`,
      method: 'DELETE',
      protected: true,
    }),
}

export default healthStatusService
