import { Config } from '@/utils/config'
import { apiRequest } from './api-service'
import type { DonationDTO } from '@/types/dto/DonationDTO'

const PAYMENT_API = Config.apiURL + '/payments'

const paymentService = {
  payDonation: (input: DonationDTO) =>
    apiRequest({
      url: `${PAYMENT_API}/donation`,
      method: 'POST',
      data: {
        email: input.email,
        amount: input.amount,
        token: input.token,
      },
    }),
}

export default paymentService
