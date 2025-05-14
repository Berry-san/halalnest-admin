import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from '../molecules/Modal'
import { useAddVideo } from '../../hooks/useVideos'

interface UploadVideoProps {
  isVisible: boolean
  onClose: () => void
}

const UploadVideo: React.FC<UploadVideoProps> = ({ isVisible, onClose }) => {
  const [title, setTitle] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [description, setDescription] = useState('')

  // Mutation for adding a video
  const addVideoMutation = useAddVideo()

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const videoData = {
      video_title: title,
      video_description: description,
      video_url: youtubeUrl,
    }

    // Execute the mutation
    addVideoMutation.mutate(videoData, {
      onSuccess: () => {
        toast.success('Video uploaded successfully')
        onClose()
      },
      onError: (error: unknown) => {
        if (error instanceof Error) {
          toast.error(error.message || 'Failed to upload video')
        } else {
          toast.error('An unknown error occurred')
        }
      },
    })
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <form onSubmit={handleFormSubmit} className="w-80">
        <h2 className="text-2xl font-bold">Upload a Video</h2>
        <div className="flex flex-col mt-4 space-y-3">
          <div className="flex flex-col space-y-2">
            <label htmlFor="">Video Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 border rounded-md border-border_color focus:outline-none"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="">YouTube URL</label>
            <input
              type="text"
              placeholder="YouTube URL"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="px-3 py-2 border rounded-md border-border_color focus:outline-none"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="">Video Description</label>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 border rounded-md border-border_color focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={addVideoMutation.isLoading}
            className="px-4 py-2 text-white bg-black rounded"
          >
            {addVideoMutation.isLoading ? 'Uploading...' : 'Upload Video'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default UploadVideo
