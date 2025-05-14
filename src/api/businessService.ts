import { Business } from '../shared.types'
import { apiBase } from './apiBase'

export const businessService = {
  async getBusinesss(): Promise<Business[]> {
    try {
      const response = await apiBase.get('business/business_detail')
      return response.data.businessDetails
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async getBusinessDetails(business_id: string): Promise<Business[]> {
    try {
      const response = await apiBase.get(
        `business/business_details?business_id=${business_id}`
      )
      return response.data.businessDetails
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async addBusiness(formData: FormData): Promise<void> {
    try {
      const response = await apiBase.post('business/add_business', formData)
      return response.data.business
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async updateBusiness(formData: FormData): Promise<void> {
    try {
      const response = await apiBase.post(
        `business/update_business`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      console.log('response', response)
      return response.data.business
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async deleteBusiness(businessId: string): Promise<void> {
    try {
      await apiBase.delete(`business/delete_business`, { data: { businessId } })
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },
}
