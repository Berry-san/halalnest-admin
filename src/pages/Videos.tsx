import { useState } from 'react'
import VideoCard from '../components/molecules/VideoCard'
import {
  useDeleteVideo,
  useGetVideos,
  // useUpdateVideo,
} from '../hooks/useVideos'
import Button from '../components/atoms/Button'
import UploadVideo from '../components/organisms/UploadVideo'
import SearchBar from '../components/molecules/SearchBar'
import { Video } from '../shared.types'
import Modal from '../components/molecules/Modal'
import deleteButton from '../assets/icons/deleteIcon.svg'
import editButton from '../assets/icons/editIcon.svg'
import EditVideo from '../components/organisms/EditModal'

const Videos = () => {
  const { data: videos, isLoading, error } = useGetVideos()
  const deleteVideoMutation = useDeleteVideo()
  // const [editingVideoId, setEditingVideoId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [videoToEdit, setVideoToEdit] = useState<Video | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [videoToDelete, setVideoToDelete] = useState<Video | null>(null)
  // Function to handle deleting a video
  const handleDeleteVideo = () => {
    if (videoToDelete) {
      deleteVideoMutation.mutate(videoToDelete.video_id, {
        onSuccess: () => {
          setShowDeleteModal(false)
          setVideoToDelete(null)
        },
        onError: () => {
          // Handle error (e.g., show a notification or alert)
          console.error('Failed to delete the video.')
        },
      })
    }
  }

  // Function to handle updating a video
  // const handleUpdateVideo = (videoId: string, newTitle: string) => {
  //   const updateVideoMutation = useUpdateVideo(videoId)
  //   updateVideoMutation.mutate({ title: newTitle })
  //   setEditingVideoId(null)
  // }

  const filteredData = videos
    ? videos.filter((video: Video) =>
        video.video_title.toLowerCase().includes(searchTerm)
      )
    : []

  // Open edit modal
  const openEditModal = (video: Video) => {
    setVideoToEdit(video)
    setShowEditModal(true)
  }

  // Close edit modal
  const closeEditModal = () => {
    setVideoToEdit(null)
    setShowEditModal(false)
  }

  if (isLoading) return <p>Loading videos...</p>
  if (error) return <p>Error loading videos.</p>

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Videos</h2>
        <div className="flex flex-col items-center justify-between w-full my-5 space-y-3 md:flex-row md:space-y-0">
          <SearchBar
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <div>
            <Button
              text={'Upload a video'}
              onClick={() => setShowUploadModal(true)}
            />
          </div>
        </div>
        <section className="order-2 col-span-1 lg:col-span-3 ">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 2xl:grid-cols-4">
            {filteredData.map((video: Video) => (
              <div key={video.video_id} className="relative group">
                <VideoCard
                  url={video.video_url}
                  title={video.video_title}
                  date={video.time_in}
                />
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => {
                      setVideoToDelete(video)
                      setShowDeleteModal(true)
                    }}
                    className="p-2 transition-opacity rounded-full"
                  >
                    <img
                      src={deleteButton}
                      alt="Delete Video"
                      className="w-8 h-8 p-2 bg-white rounded"
                    />
                  </button>

                  <button
                    onClick={() => openEditModal(video)}
                    className="p-2 transition-opacity rounded-full"
                  >
                    <img
                      src={editButton}
                      alt="Delete Video"
                      className="w-8 h-8 p-1 bg-white rounded"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      {showUploadModal && (
        <UploadVideo
          isVisible={showUploadModal}
          onClose={() => setShowUploadModal(false)}
        />
      )}

      {showDeleteModal && (
        <Modal
          isVisible={showDeleteModal}
          onClose={() => {
            setVideoToDelete(null)
            setShowDeleteModal(false)
          }}
        >
          <section className="flex flex-col items-center justify-center space-y-5 text-center">
            <div className="p-5 bg-red-100 rounded-full">
              <img src={deleteButton} className="w-8 h-8" alt="Delete" />
            </div>
            <div className="space-y-3 text-warning">
              <p className="font-semibold">Confirm delete</p>
              <p className="max-w-sm text-xsm">
                Are you sure you want to delete this video? This action cannot
                be undone.
              </p>
            </div>
            <button
              onClick={handleDeleteVideo}
              disabled={deleteVideoMutation.isLoading}
              className="py-4 text-white bg-red-600 rounded-md w-60"
            >
              Yes, delete
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="hover:underline"
            >
              Cancel
            </button>
          </section>
        </Modal>
      )}

      {showEditModal && videoToEdit && (
        <EditVideo
          isVisible={showEditModal}
          onClose={closeEditModal}
          video={videoToEdit}
        />
      )}
    </>
  )
}

export default Videos
