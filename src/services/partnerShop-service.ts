import type { Restaurant } from '@/types/models/restoraunt'
import { Config } from '@/utils/config'
import { apiRequest } from './api-service'

const PARTNER_SHOP_API = Config.apiURL + '/restaurant'

const partnerShopService = {
  getResourants: () =>
    apiRequest<Restaurant[]>({
      method: 'GET',
      url: PARTNER_SHOP_API,
    }),
}

export default partnerShopService
