import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from '../molecules/Modal'
import { useUpdateMosque } from '../../hooks/useMosques'

interface EditMosqueProps {
  isVisible: boolean
  onClose: () => void
  mosque_id: string
}

const EditMosque: React.FC<EditMosqueProps> = ({
  isVisible,
  onClose,
  mosque_id,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null)

  const updateMosqueMutation = useUpdateMosque()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageFile(event.target.files[0])
    }
  }

  console.log(mosque_id, imageFile)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!imageFile) {
      toast.error('Please select an image file')
      return
    }

    const formData = new FormData()
    formData.append('image', imageFile)
    formData.append('mosque_id', mosque_id)

    updateMosqueMutation.mutate(formData, {
      onSuccess: () => {
        toast.success('Mosque image updated successfully')
        onClose()
      },
      onError: (error: unknown) => {
        if (error instanceof Error) {
          toast.error(error.message || 'Failed to update image')
        } else {
          toast.error('An unknown error occurred')
        }
      },
    })
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <form onSubmit={handleSubmit} className="w-80">
        <h2 className="text-2xl font-bold">Edit Mosque Image</h2>
        <div className="flex flex-col mt-4 space-y-3">
          <div className="flex flex-col space-y-2">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              className="px-3 py-2 border rounded-md border-border_color focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={updateMosqueMutation.isLoading}
            className="px-4 py-2 text-white bg-black rounded"
          >
            {updateMosqueMutation.isLoading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default EditMosque
