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
}

export default healthStatusService
