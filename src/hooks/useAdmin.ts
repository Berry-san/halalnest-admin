import { useMutation, useQuery } from 'react-query'
import { adminService } from '../api/adminService'
import { AdminLoginRequest, ReportIssue } from '../shared.types'

export const useAdminLogin = () => {
  return useMutation((loginData: AdminLoginRequest) =>
    adminService.loginAdmin(loginData)
  )
}

export const useGetReports = (startDate?: string) => {
  return useQuery<ReportIssue[]>(['getReports', startDate], () =>
    adminService.getReports(startDate || '')
  )
}
