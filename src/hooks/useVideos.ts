// hooks/useVideos.ts
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { videoService } from '../api/videoService'
import { toast } from 'react-toastify'
import { VideoRequest } from '../shared.types'

// Fetch all videos
export const useGetVideos = () => {
  return useQuery('videos', videoService.getVideos)
}

// Fetch a single video
export const useGetVideo = (videoId: string) => {
  return useQuery(['video', videoId], () => videoService.getVideo(videoId))
}

// Add a video
export const useAddVideo = () => {
  const queryClient = useQueryClient()
  return useMutation(videoService.addVideo, {
    onSuccess: () => {
      // Invalidate and refetch videos after a new video is added
      queryClient.invalidateQueries('videos')
      toast.success('Video added successfully')
    },
    onError: () => {
      toast.error("Couldn't add video")
    },
  })
}

// Update a video
export const useUpdateVideo = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ videoId, videoData }: { videoId: string; videoData: VideoRequest }) =>
      videoService.updateVideo(videoId, videoData),
    {
      onSuccess: (_, { videoId }) => {
        // Invalidate and refetch the video data
        queryClient.invalidateQueries(['video', videoId])
        toast.success('Video updated successfully')
      },
      onError: (error: unknown) => {
        if (error instanceof Error) {
          toast.error(error.message || "Couldn't update the video")
        } else {
          toast.error('An unknown error occurred')
        }
      },
    }
  )
}

// Delete a video
export const useDeleteVideo = () => {
  const queryClient = useQueryClient()
  return useMutation((videoId: string) => videoService.deleteVideo(videoId), {
    onSuccess: () => {
      // Invalidate and refetch videos after one is deleted
      queryClient.invalidateQueries('videos')
      toast.success('Video deleted successfully')
    },
    onError: () => {
      toast.error("Couldn't delete video")
    },
  })
}
