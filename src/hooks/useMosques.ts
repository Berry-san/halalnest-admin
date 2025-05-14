import { toast } from 'react-toastify'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { mosqueService } from '../api/mosqueService'

// Fetch all schools
export const useGetMosques = () => {
  return useQuery('mosques', mosqueService.getMosques)
}

export const useGetMosqueDetails = (mosque_id: string) => {
  return useQuery(['mosqueDetails', mosque_id], () =>
    mosqueService.getMosqueDetails(mosque_id)
  )
}

export const useGetMosque = (MosqueId: string) => {
  return useQuery(['mosque', MosqueId], () =>
    mosqueService.getMosqueDetails(MosqueId)
  )
}

// Add a Mosque
export const useAddMosque = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (formData: FormData) => mosqueService.addMosque(formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('mosques')
      },
    }
  )
}

// Update a Mosque
export const useUpdateMosque = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (formData: FormData) => mosqueService.updateMosque(formData),

    {
      onSuccess: () => {
        // Invalidate and refetch the updated Mosque
        queryClient.invalidateQueries(['mosques'])
      },
    }
  )
}

// Delete a Mosque
export const useDeleteMosque = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (mosqueId: string) => mosqueService.deleteMosque(mosqueId),
    {
      onSuccess: () => {
        // Invalidate and refetch videos after one is deleted
        queryClient.invalidateQueries('mosques')
        toast.success('Mosque deleted successfully')
      },
      onError: () => {
        toast.error("Couldn't delete video")
      },
    }
  )
}
