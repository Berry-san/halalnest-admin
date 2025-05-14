import { Video, VideoRequest } from '../shared.types'
import { apiBase } from './apiBase'

// export const getVideos = async () => {
//   const response = await apiBase.get('/entertain/video_list')
//   return response.data.products
// }

// export const getVideo = async (videoId: string) => {
//   const response = await apiBase.get(`/entertain/video_details/${videoId}`)
//   return response.data
// }

// export const addVideo = async (videoData: {
//   video_url: string
//   video_description: string
//   video_title: string
// }) => {
//   const response = await apiBase.post('/entertain/videos', videoData)
//   return response.data
// }

// export const updateVideo = async (videoId: string, videoData: Video) => {
//   const response = await apiBase.put(`/entertain/videos/${videoId}`, videoData)
//   return response.data
// }

// export const deleteVideo = async (videoId: string) => {
//   const response = await apiBase.delete(`/entertain/videos/${videoId}`)
//   return response.data
// }

export const videoService = {
  async getVideos(): Promise<Video[]> {
    try {
      const response = await apiBase.get('/entertain/video_list')
      return response.data.products
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async getVideo(videoId: string): Promise<Video> {
    try {
      const response = await apiBase.get(`/entertain/video_details/${videoId}`)
      return response.data.videoDetails
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async addVideo(videoData: VideoRequest): Promise<void> {
    try {
      const response = await apiBase.post('/entertain/add_video', videoData)
      return response.data.videos
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async updateVideo(videoId: string, videoData: VideoRequest): Promise<void> {
    try {
      await apiBase.post(`/entertain/update_video/${videoId}`, videoData)
    } catch (error) {
      console.error('Error updating video:', error)
      throw new Error('Could not update the video')
    }
  },

  async deleteVideo(videoId: string): Promise<void> {
    try {
      await apiBase.post(`/entertain/delete_video/${videoId}`)
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },
}
