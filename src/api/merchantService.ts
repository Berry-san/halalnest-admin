import { Merchant } from '../shared.types'
import { apiBase } from './apiBase'

export const merchantService = {
  async getAllMerchants(): Promise<Merchant[]> {
    const response = await apiBase.get('/all_merchants')
    console.log(response)
    return response.data.sellers
  },

  async activateMerchant(merchantId: number): Promise<void> {
    return await apiBase.post(`/activate_merchant/${merchantId}`)
  },

  async deactivateMerchant(merchantId: number): Promise<void> {
    return await apiBase.post(`/deactivate_merchant/${merchantId}`)
  },
}
