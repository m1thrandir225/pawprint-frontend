import { Config } from '@/utils/config'
import { apiRequest } from './api-service'
import type { Vaccination } from '@/types/models/vaccination'

const VACCINATION_API_URL = Config.apiURL + '/vaccinations'

const vaccinationService = {
  getVaccinations: () =>
    apiRequest<Vaccination[]>({
      url: VACCINATION_API_URL,
      method: 'GET',
      protected: true,
    }),
}

export default vaccinationService;
