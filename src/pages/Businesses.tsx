import { useState } from 'react'
import Button from '../components/atoms/Button'
import SearchBar from '../components/molecules/SearchBar'
import { Business } from '../shared.types'
import Modal from '../components/molecules/Modal'
import deleteButton from '../assets/icons/deleteIcon.svg'
import editButton from '../assets/icons/editIcon.svg'
import { useGetBusinesses, useDeleteBusiness } from '../hooks/useBusiness'
import EditMosque from '../components/organisms/EditMosque'
import AddMosque from '../components/organisms/AddMosque'
import BusinessCard from '../components/molecules/BusinessCard'

const Businesses = () => {
  const { data: businesses, isLoading, error } = useGetBusinesses()
  const deleteBusinessMutation = useDeleteBusiness()
  const [searchTerm, setSearchTerm] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [businessToEdit, setBusinessToEdit] = useState<Business | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [businessToDelete, setBusinessToDelete] = useState<Business | null>(
    null
  )

  const handleDeleteMosque = () => {
    if (businessToDelete) {
      deleteBusinessMutation.mutate(businessToDelete.business_id, {
        onSuccess: () => {
          setShowDeleteModal(false)
          setBusinessToDelete(null)
        },
        onError: () => {
          console.error('Failed to delete the mosque.')
        },
      })
    }
  }

  const filteredData = businesses
    ? businesses.filter((business: Business) =>
        business.business_name.toLowerCase().includes(searchTerm)
      )
    : []

  // Open edit modal
  const openEditModal = (business: Business) => {
    setBusinessToEdit(business)
    setShowEditModal(true)
  }

  // Close edit modal
  const closeEditModal = () => {
    setBusinessToEdit(null)
    setShowEditModal(false)
  }

  if (isLoading) return <p>Loading businesses...</p>
  if (error) return <p>Error loading businesses.</p>

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Businesses</h2>
        <div className="flex flex-col items-center justify-between w-full my-5 space-y-3 md:flex-row md:space-y-0">
          <SearchBar
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <div>
            <Button
              text={'Add Business'}
              onClick={() => setShowUploadModal(true)}
            />
          </div>
        </div>
        <section className="order-2 col-span-1 lg:col-span-3 ">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 2xl:grid-cols-4">
            {filteredData.map((business: Business) => (
              <div key={business.business_id} className="relative group">
                <BusinessCard
                  image={business.image?.image1 || ''}
                  business_name={business.business_name}
                  business_phonenumber={business.business_phonenumber}
                  business_address={business.business_address}
                  hca_certifaction={business.hca_certifaction}
                />
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => {
                      setBusinessToDelete(business)
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
                    onClick={() => openEditModal(business)}
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
            ))}
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
            setBusinessToDelete(null)
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
              disabled={deleteBusinessMutation.isLoading}
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

      {showEditModal && businessToEdit && (
        <EditMosque
          isVisible={showEditModal}
          onClose={closeEditModal}
          mosque_id={businessToEdit.business_id}
        />
      )}
    </>
  )
}

export default Businesses
