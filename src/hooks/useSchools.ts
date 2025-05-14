// hooks/useSchools.ts
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { schoolService } from '../api/schoolService'
import { School } from '../shared.types'

// Fetch all schools
export const useGetSchools = () => {
  return useQuery('schools', schoolService.getSchools)
}

export const useGetSchoolsDetails = () => {
  return useQuery('schoolsDetails', schoolService.getSchoolsDetails)
}

// Fetch a single school
export const useGetSchool = (schoolId: string) => {
  return useQuery(['school', schoolId], () =>
    schoolService.getSchoolDetails(schoolId)
  )
}

// Add a school
export const useAddSchool = () => {
  const queryClient = useQueryClient()
  return useMutation(schoolService.addSchool, {
    onSuccess: () => {
      // Invalidate and refetch schools after a new school is added
      queryClient.invalidateQueries('schools')
    },
  })
}

// Update a school
export const useUpdateSchool = (schoolId: string) => {
  const queryClient = useQueryClient()
  return useMutation(
    (schoolData: School) => schoolService.updateSchool(schoolId, schoolData),
    {
      onSuccess: () => {
        // Invalidate and refetch the updated school
        queryClient.invalidateQueries(['schoolsDetails', schoolId])
      },
    }
  )
}

// Delete a school
export const useDeleteSchool = () => {
  const queryClient = useQueryClient()
  return useMutation(schoolService.deleteSchool, {
    onSuccess: () => {
      // Invalidate and refetch schools after one is deleted
      queryClient.invalidateQueries('schoolsDetails')
    },
  })
}
