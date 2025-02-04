import { Config } from '@/utils/config'
import { apiRequest } from './api-service'
import type { StatisticsDTO } from '@/types/dto/StatisticsDTO'

const STATISTICS_API_URL = Config.apiURL + '/statistics'

const statisticsService = {
  getStatistics: () =>
    apiRequest<StatisticsDTO>({
      url: STATISTICS_API_URL,
      method: 'GET',
      protected: true,
    }),
}
export default statisticsService
