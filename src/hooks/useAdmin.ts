import { useMutation } from 'react-query'
import { adminService } from '../api/adminService'
import { AdminLoginRequest } from '../shared.types'

export const useAdminLogin = () => {
  return useMutation((loginData: AdminLoginRequest) =>
    adminService.loginAdmin(loginData)
  )
}
