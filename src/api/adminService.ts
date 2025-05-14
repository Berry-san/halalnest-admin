import { AdminLoginRequest } from '../shared.types'
import { apiBase } from './apiBase'

// Admin Signup
export const adminService = {
  async loginAdmin(data: AdminLoginRequest): Promise<void> {
    return await apiBase.post('/admin/login', data)
  },
}
