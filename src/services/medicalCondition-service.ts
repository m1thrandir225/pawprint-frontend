import { Config } from '@/utils/config'
import { apiRequest } from './api-service'
import type { MedicalCondition } from '@/types/models/medicalCondition'

const MEDICAL_CONDITION_API_URL = Config.apiURL + '/medical-conditions'

const medicalConditionService = {
  getMedicalConditions: () =>
    apiRequest<MedicalCondition[]>({
      url: MEDICAL_CONDITION_API_URL,
      method: 'GET',
      protected: true,
    }),
}

export default medicalConditionService;
