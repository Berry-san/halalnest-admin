import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from '../molecules/Modal'
import { useUpdateVideo } from '../../hooks/useVideos'
import { Video } from '../../shared.types'

interface EditVideoProps {
  isVisible: boolean
  onClose: () => void
  video: Video | null
}

const EditVideo: React.FC<EditVideoProps> = ({ isVisible, onClose, video }) => {
  const [title, setTitle] = useState(video?.video_title || '')
  const [description, setDescription] = useState(video?.video_description || '')
  const [url, setUrl] = useState(video?.video_url || '')

  const updateVideoMutation = useUpdateVideo()

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!video) return

    const videoData = {
      video_title: title,
      video_description: description,
      video_url: url,
    }

    updateVideoMutation.mutate(
      { videoId: video.video_id, videoData },
      {
        onSuccess: () => {
          toast.success('Video updated successfully')
          onClose()
        },
        onError: (error: unknown) => {
          if (error instanceof Error) {
            toast.error(error.message || 'Failed to update video')
          } else {
            toast.error('An unknown error occurred')
          }
        },
      }
    )
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <form onSubmit={handleFormSubmit} className="w-80">
        <h2 className="text-2xl font-bold">Edit Video</h2>
        <div className="flex flex-col mt-4 space-y-3">
          <div className="flex flex-col space-y-2">
            <label htmlFor="title">Video Title</label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 border rounded-md border-border_color focus:outline-none"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="url">Video URL</label>
            <input
              type="text"
              id="url"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="px-3 py-2 border rounded-md border-border_color focus:outline-none"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="description">Video Description</label>
            <textarea
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 border rounded-md border-border_color focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={updateVideoMutation.isLoading}
            className="px-4 py-2 text-white bg-black rounded"
          >
            {updateVideoMutation.isLoading ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default EditVideo
