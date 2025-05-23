import { AdminLoginRequest, ReportIssue } from '../shared.types'
import { apiBase } from './apiBase'

// Admin Signup
export const adminService = {
  async loginAdmin(data: AdminLoginRequest): Promise<void> {
    return await apiBase.post('admin/admin_login', data)
  },

  async getReports(startDate: string): Promise<ReportIssue[]> {
    try {
      const response = await apiBase.get(
        `users/complaints?startDate=${startDate}`
      )
      console.log(response.data.data)
      return response.data.data
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },
}
