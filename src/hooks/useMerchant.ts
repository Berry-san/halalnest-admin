import { useQuery } from 'react-query'
import { merchantService } from '../api/merchantService'
import { Merchant } from '../shared.types'

export function useAllMerchants() {
  return useQuery<Merchant[]>('allMerchants', merchantService.getAllMerchants)
}

export function useActivateMerchant(merchantId: number) {
  return useQuery(['activateMerchant', merchantId], () =>
    merchantService.activateMerchant(merchantId)
  )
}

export function useDeactivateMerchant(merchantId: number) {
  return useQuery(['deactivateMerchant', merchantId], () =>
    merchantService.deactivateMerchant(merchantId)
  )
}
