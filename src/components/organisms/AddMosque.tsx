import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from '../molecules/Modal'
import { useAddMosque } from '../../hooks/useMosques'

interface AddMosqueProps {
  isVisible: boolean
  onClose: () => void
}

const AddMosque: React.FC<AddMosqueProps> = ({ isVisible, onClose }) => {
  const [mosqueName, setMosqueName] = useState('')
  const [address, setAddress] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [airCondition, setAirCondition] = useState('YES')
  const [femalePrayingSection, setFemalePrayingSection] = useState('YES')
  const [toilet, setToilet] = useState('YES')

  const addMosqueMutation = useAddMosque()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!image) {
      toast.error('Please upload an image')
      return
    }

    console.log(image)

    const formData = new FormData()
    formData.append('halal_id', '2')
    formData.append('halal_nest_item_id', '4')
    formData.append('video_link', 'https://www.youtube.com/watch?v=_zZmKMac8wE')
    formData.append('mosque_name', mosqueName)
    formData.append('address', address)
    formData.append('image', image)
    formData.append('air_condition', airCondition)
    formData.append('female_praying_section', femalePrayingSection)
    formData.append('toilet', toilet)

    addMosqueMutation.mutate(formData, {
      onSuccess: () => {
        toast.success('Mosque added successfully')
        onClose()
      },
      onError: (error: unknown) => {
        if (error instanceof Error) {
          toast.error(error.message || 'Failed to add mosque')
        } else {
          toast.error('An unknown error occurred')
        }
      },
    })
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <form onSubmit={handleSubmit} className="h-[40rem] overflow-auto w-96">
        <h2 className="text-2xl font-bold">Add New Mosque</h2>
        <div className="flex flex-col mt-4 space-y-4">
          <div>
            <label className="block mb-1">Mosque Name</label>
            <input
              type="text"
              value={mosqueName}
              onChange={(e) => setMosqueName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md border-border_color"
            />
          </div>

          <div>
            <label className="block mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md border-border_color"
            />
          </div>

          <div>
            <label className="block mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full px-3 py-2 border rounded-md border-border_color"
            />
          </div>

          <div>
            <label className="block mb-1">Air Condition</label>
            <select
              value={airCondition}
              onChange={(e) => setAirCondition(e.target.value)}
              className="w-full px-3 py-2 border rounded-md border-border_color"
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Female Praying Section</label>
            <select
              value={femalePrayingSection}
              onChange={(e) => setFemalePrayingSection(e.target.value)}
              className="w-full px-3 py-2 border rounded-md border-border_color"
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Toilet</label>
            <select
              value={toilet}
              onChange={(e) => setToilet(e.target.value)}
              className="w-full px-3 py-2 border rounded-md border-border_color"
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={addMosqueMutation.isLoading}
            className="px-4 py-2 text-white bg-black rounded"
          >
            {addMosqueMutation.isLoading ? 'Submitting...' : 'Add Mosque'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddMosque
