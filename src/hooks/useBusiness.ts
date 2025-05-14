import { toast } from 'react-toastify'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { businessService } from '../api/businessService'

// Fetch all businesses
export const useGetBusinesses = () => {
  return useQuery('business', businessService.getBusinesss)
}

// Fetch a single business
export const useGetBusinessDetails = (business_id: string) => {
  return useQuery(['businessDetails', business_id], () =>
    businessService.getBusinessDetails(business_id)
  )
}

// Add a business
export const useAddBusiness = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (formData: FormData) => businessService.addBusiness(formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('business')
      },
    }
  )
}

// Update a business
export const useUpdateBusiness = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (formData: FormData) => businessService.updateBusiness(formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['business'])
      },
    }
  )
}

// Delete a business
export const useDeleteBusiness = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (businessId: string) => businessService.deleteBusiness(businessId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('business')
        toast.success('Business deleted successfully')
      },
      onError: () => {
        toast.error("Couldn't delete business")
      },
    }
  )
}
