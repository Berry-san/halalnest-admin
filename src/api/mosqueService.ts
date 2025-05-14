import { Mosque } from '../shared.types'
import { apiBase } from './apiBase'

export const mosqueService = {
  async getMosques(): Promise<Mosque[]> {
    try {
      const response = await apiBase.get('mosque/mosque_detail')
      return response.data.mosques
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async getMosqueDetails(mosque_id: string): Promise<Mosque[]> {
    try {
      const response = await apiBase.get(
        `mosque/mosque_details?mosque_id=${mosque_id}`
      )
      return response.data.mosqueDetails
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async addMosque(formData: FormData): Promise<void> {
    try {
      const response = await apiBase.post('mosque/add_mosque', formData)
      return response.data.mosque
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async updateMosque(formData: FormData): Promise<void> {
    try {
      const response = await apiBase.post(`mosque/update_mosque`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('response', response)
      return response.data.mosque
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async deleteMosque(mosque_id: string): Promise<void> {
    try {
      await apiBase.post(`mosque/delete_mosque`, { mosque_id })
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },
}
