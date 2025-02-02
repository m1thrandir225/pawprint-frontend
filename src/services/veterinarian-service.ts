import { Config } from '@/utils/config'
import { apiRequest } from './api-service'
import type { Veterinarian } from '@/types/models/veterinarian'

const VETERINARIAN_API_URL = Config.apiURL + '/veterinarians'

const veterinarianService = {
  getVeterinarians: () =>
    apiRequest<Veterinarian[]>({
      url: VETERINARIAN_API_URL,
      method: 'GET',
      protected: true,
    }),
}

export default veterinarianService;
