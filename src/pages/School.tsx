import { useState } from 'react'
import Button from '../components/atoms/Button'
import SearchBar from '../components/molecules/SearchBar'
import Modal from '../components/molecules/Modal'
import deleteIcon from '../assets/icons/deleteIcon.svg'
import editIcon from '../assets/icons/editIcon.svg'
// import AddSchool from '../components/organisms/AddSchool'
// import EditSchool from '../components/organisms/EditSchool'
import SchoolCard from '../components/molecules/SchoolCard'
import { School } from '../shared.types'
import { useGetSchools, useDeleteSchool } from '../hooks/useSchools'

const Schools = () => {
  const { data: schools, isLoading, error } = useGetSchools()
  const deleteSchoolMutation = useDeleteSchool()

  const [searchTerm, setSearchTerm] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [schoolToEdit, setSchoolToEdit] = useState<School | null>(null)
  const [schoolToDelete, setSchoolToDelete] = useState<School | null>(null)

  const filteredSchools = schools
    ? schools.filter((school: School) =>
        school.school_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const handleDeleteSchool = () => {
    if (schoolToDelete) {
      deleteSchoolMutation.mutate(schoolToDelete.school_id, {
        onSuccess: () => {
          setShowDeleteModal(false)
          setSchoolToDelete(null)
        },
        onError: () => {
          console.error('Failed to delete school')
        },
      })
    }
  }

  if (isLoading) return <p>Loading schools...</p>
  if (error) return <p>Error loading schools.</p>

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Schools</h2>
        <div className="flex flex-col items-center justify-between w-full my-5 space-y-3 md:flex-row md:space-y-0">
          <SearchBar
            placeholder="Search schools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button text="Add School" onClick={() => setShowUploadModal(true)} />
        </div>

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-3 2xl:grid-cols-4">
          {filteredSchools.map((school: School) => (
            <div key={school.school_id} className="relative group">
              <SchoolCard
                school_name={school.school_name}
                address={school.school_address}
                school_phonenumber={school.school_phonenumber}
                image_1={school.image_1}
                school_scope={school.school_scope}
                living_facility={school.living_facility}
              />
              <div className="absolute flex space-x-2 top-2 right-2">
                <button
                  onClick={() => {
                    setSchoolToDelete(school)
                    setShowDeleteModal(true)
                  }}
                  className="p-2 bg-white rounded-full"
                >
                  <img
                    src={deleteIcon}
                    alt="Delete school"
                    className="w-6 h-6"
                  />
                </button>
                <button
                  onClick={() => {
                    setSchoolToEdit(school)
                    setShowEditModal(true)
                  }}
                  className="p-2 bg-white rounded-full"
                >
                  <img src={editIcon} alt="Edit school" className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Add Modal */}
      {/* {showUploadModal && (
        <AddSchool
          isVisible={showUploadModal}
          onClose={() => setShowUploadModal(false)}
        />
      )} */}

      {/* Delete Modal */}
      {showDeleteModal && (
        <Modal
          isVisible={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        >
          <section className="flex flex-col items-center justify-center space-y-5 text-center">
            <div className="p-5 bg-red-100 rounded-full">
              <img src={deleteIcon} className="w-8 h-8" alt="Delete" />
            </div>
            <div className="space-y-3 text-warning">
              <p className="font-semibold">Confirm delete</p>
              <p className="max-w-sm text-sm">
                Are you sure you want to delete this school? This action cannot
                be undone.
              </p>
            </div>
            <button
              onClick={handleDeleteSchool}
              disabled={deleteSchoolMutation.isLoading}
              className="py-2 text-white bg-red-600 rounded-md w-60"
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

      {/* Edit Modal */}
      {/* {showEditModal && schoolToEdit && (
        <EditSchool
          isVisible={showEditModal}
          onClose={() => {
            setSchoolToEdit(null)
            setShowEditModal(false)
          }}
          school={schoolToEdit}
        />
      )} */}
    </>
  )
}

export default Schools
