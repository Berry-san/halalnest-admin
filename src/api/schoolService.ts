import { School } from '../shared.types'
import { apiBase } from './apiBase'

export const schoolService = {
  async getSchools() {
    try {
      const response = await apiBase.get('/list_of_school/school_detail')
      return response.data.schools
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async getSchoolsDetails(): Promise<School[]> {
    try {
      const response = await apiBase.get('/list_of_school/school_detail')
      return response.data.schools
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async getSchoolDetails(schoolId: string): Promise<School> {
    try {
      const response = await apiBase.get(
        `/list_of_school/school_list_details/${schoolId}`
      )
      return response.data.schoolDetails
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async addSchool(schoolData: School): Promise<void> {
    try {
      const response = await apiBase.post(
        '/list_of_school/add_list_of_school',
        schoolData
      )
      return response.data.schools
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async updateSchool(schoolId: string, schoolData: School): Promise<void> {
    try {
      await apiBase.post(
        `list_of_school/update_list_of_school/${schoolId}`,
        schoolData
      )
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async deleteSchool(schoolId: string): Promise<void> {
    try {
      await apiBase.delete(`list_of_school/delete_list_of_school/${schoolId}`)
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },
}
