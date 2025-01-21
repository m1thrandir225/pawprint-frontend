import { Config } from '@/utils/config'
import { apiRequest } from './api-service'
import type { VeterinarianSpecialization } from '@/types/models/veterinarianSpecialization'

const VETERINARIAN_SPECIALIZATION_API_URL = Config.apiURL + '/veterinarian-specializations'

const veterinarianSpecializationService = {
  getVeterinarianSpecializations: () =>
    apiRequest<VeterinarianSpecialization[]>({
      url: VETERINARIAN_SPECIALIZATION_API_URL,
      method: 'GET',
      protected: true,
    }),
}

export default veterinarianSpecializationService;
