import React from 'react'
import Modal from './Modal'
import Button from '../atoms/Button'

interface DeleteConfirmationModalProps {
  isVisible: boolean
  onClose: () => void
  onConfirm: () => void
  itemName: string
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  itemName,
}) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="p-6 text-center">
        <h3 className="mb-4 text-lg font-semibold">Confirm Deletion</h3>
        <p>
          Are you sure you want to delete <strong>{itemName}</strong>?
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button text="Cancel" onClick={onClose} className="bg-gray-400" />
          <Button text="Delete" onClick={onConfirm} className="bg-red-500" />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteConfirmationModal
