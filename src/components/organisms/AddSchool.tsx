import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from '../molecules/Modal'
import { useAddSchool } from '../../hooks/useSchools'

interface AddSchoolProps {
  isVisible: boolean
  onClose: () => void
}

const AddSchool: React.FC<AddSchoolProps> = ({ isVisible, onClose }) => {
  const [schoolData, setSchoolData] = useState({
    school_name: '',
    location: '',
    min_tutorial_fee: '',
    max_tutorial_fee: '',
    living_facility: '',
  })

  const addSchoolMutation = useAddSchool()

  //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.files && e.target.files.length > 0) {
  //       setImage(e.target.files[0])
  //     }
  //   }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // if (!image) {
    //   toast.error('Please upload an image')
    //   return
    // }

    // console.log(image)

    const formData = new FormData()
    formData.append('school_name', schoolData.school_name)
    formData.append('halal_id', '1')
    formData.append('halal_nest_item_id', '1')
    formData.append('location', schoolData.location)
    formData.append('min_tutorial_fee', schoolData.min_tutorial_fee)
    formData.append('max_tutorial_fee', schoolData.max_tutorial_fee)
    formData.append('living_facility', schoolData.living_facility)
    // formData.append('image', image)

    addSchoolMutation.mutate(formData, {
      onSuccess: () => {
        toast.success('School added successfully')
        onClose()
      },
      onError: (error: unknown) => {
        if (error instanceof Error) {
          toast.error(error.message || 'Failed to add school')
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
            <label className="block mb-1">School Name</label>
            <input
              type="text"
              value={schoolData.school_name}
              onChange={(e) =>
                setSchoolData((prev) => ({
                  ...prev,
                  school_name: e.target.value,
                }))
              }
              required
              className="w-full px-3 py-2 border rounded-md border-border_color"
            />
          </div>

          <div>
            <label className="block mb-1">Location</label>
            <input
              type="text"
              value={schoolData.location}
              onChange={(e) =>
                setSchoolData((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
              required
              className="w-full px-3 py-2 border rounded-md border-border_color"
            />
          </div>

          {/* <div>
            <label className="block mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full px-3 py-2 border rounded-md border-border_color"
            />
          </div> */}

          <div>
            <label className="block mb-1">Living Facility</label>
            <select
              value={schoolData.living_facility}
              onChange={(e) =>
                setSchoolData((prev) => ({
                  ...prev,
                  living_facility: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border rounded-md border-border_color"
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Minimum Tutorial Fee</label>
            <input
              type="text"
              value={schoolData.min_tutorial_fee}
              onChange={(e) =>
                setSchoolData((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
              required
              className="w-full px-3 py-2 border rounded-md border-border_color"
            />
          </div>

          <div>
            <label className="block mb-1">Max Tutorial Fee</label>
            <input
              type="text"
              value={schoolData.max_tutorial_fee}
              onChange={(e) =>
                setSchoolData((prev) => ({
                  ...prev,
                  max_tutorial_fee: e.target.value,
                }))
              }
              required
              className="w-full px-3 py-2 border rounded-md border-border_color"
            />
          </div>

          <button
            type="submit"
            disabled={addSchoolMutation.isLoading}
            className="px-4 py-2 text-white bg-black rounded"
          >
            {addSchoolMutation.isLoading ? 'Submitting...' : 'Add Mosque'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddSchool
