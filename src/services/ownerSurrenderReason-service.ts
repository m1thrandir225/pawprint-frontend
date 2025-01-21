import { Config } from '@/utils/config'
import { apiRequest } from './api-service'
import type { OwnerSurrenderReason } from '@/types/models/ownerSurrenderReason'

const OWNER_SURRENDER_REASON_API_URL = Config.apiURL + '/owner-surrender-reasons'

const ownerSurrenderReasonService = {
  getOwnerSurrenderReasons: () =>
    apiRequest<OwnerSurrenderReason[]>({
      url: OWNER_SURRENDER_REASON_API_URL,
      method: 'GET',
      protected: true,
    }),
}

export default ownerSurrenderReasonService;
