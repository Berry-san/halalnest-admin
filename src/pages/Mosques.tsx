import { useState } from 'react'
import Button from '../components/atoms/Button'
import SearchBar from '../components/molecules/SearchBar'
import { Mosque } from '../shared.types'
import Modal from '../components/molecules/Modal'
import deleteButton from '../assets/icons/deleteIcon.svg'
import editButton from '../assets/icons/editIcon.svg'
import { useGetMosques, useDeleteMosque } from '../hooks/useMosques'
import MosqueCard from '../components/molecules/MosqueCard'
import EditMosque from '../components/organisms/EditMosque'
import AddMosque from '../components/organisms/AddMosque'

const Mosques = () => {
  const { data: mosques, isLoading, error } = useGetMosques()
  const deleteMosqueMutation = useDeleteMosque()
  const [searchTerm, setSearchTerm] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [mosqueToEdit, setMosqueToEdit] = useState<Mosque | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [mosqueToDelete, setMosqueToDelete] = useState<Mosque | null>(null)

  const handleDeleteMosque = () => {
    if (mosqueToDelete) {
      deleteMosqueMutation.mutate(mosqueToDelete.mosque_id, {
        onSuccess: () => {
          setShowDeleteModal(false)
          setMosqueToDelete(null)
        },
        onError: () => {
          console.error('Failed to delete the mosque.')
        },
      })
    }
  }

  const filteredData = mosques
    ? mosques.filter((mosque: Mosque) =>
        mosque.mosque_name.toLowerCase().includes(searchTerm)
      )
    : []

  console.log(searchTerm)
  console.log(filteredData)

  // Open edit modal
  const openEditModal = (mosque: Mosque) => {
    setMosqueToEdit(mosque)
    setShowEditModal(true)
  }

  // Close edit modal
  const closeEditModal = () => {
    setMosqueToEdit(null)
    setShowEditModal(false)
  }

  if (isLoading) return <p>Loading mosques...</p>
  if (error) return <p>Error loading mosques.</p>

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Mosques</h2>
        <div className="flex flex-col items-center justify-between w-full my-5 space-y-3 md:flex-row md:space-y-0">
          <SearchBar
            placeholder="Search mosques..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <div>
            <Button
              text={'Add Mosque'}
              onClick={() => setShowUploadModal(true)}
            />
          </div>
        </div>
        <section className="order-2 col-span-1 lg:col-span-3 ">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 2xl:grid-cols-4">
            {filteredData.map((mosque: Mosque, index: number) => {
              return (
                <div key={index} className="relative">
                  <MosqueCard
                    image={mosque?.image?.image1}
                    name={mosque.mosque_name}
                    address={mosque.address}
                    air_condition={mosque.air_condition}
                    female_praying_section={mosque.female_praying_section}
                    toilet={mosque.toilet}
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => {
                        setMosqueToDelete(mosque)
                        setShowDeleteModal(true)
                      }}
                      className="p-2 transition-opacity rounded-full"
                    >
                      <img
                        src={deleteButton}
                        alt="Delete mosque"
                        className="w-8 h-8 p-2 bg-white rounded"
                      />
                    </button>

                    <button
                      onClick={() => openEditModal(mosque)}
                      className="p-2 transition-opacity rounded-full"
                    >
                      <img
                        src={editButton}
                        alt="Delete mosque"
                        className="w-8 h-8 p-1 bg-white rounded"
                      />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
      {showUploadModal && (
        <AddMosque
          isVisible={showUploadModal}
          onClose={() => setShowUploadModal(false)}
        />
      )}

      {showDeleteModal && (
        <Modal
          isVisible={showDeleteModal}
          onClose={() => {
            setMosqueToDelete(null)
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
                Are you sure you want to delete this mosque? This action cannot
                be undone.
              </p>
            </div>
            <button
              onClick={handleDeleteMosque}
              disabled={deleteMosqueMutation.isLoading}
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

      {showEditModal && mosqueToEdit && (
        <EditMosque
          isVisible={showEditModal}
          onClose={closeEditModal}
          mosque_id={mosqueToEdit.mosque_id}
        />
      )}
    </>
  )
}

export default Mosques
