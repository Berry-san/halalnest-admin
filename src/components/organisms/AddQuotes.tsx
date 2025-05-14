import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from '../molecules/Modal'
import { useAddQuote } from '../../hooks/useQuotes'

interface AddQuoteProps {
  isVisible: boolean
  onClose: () => void
}

const AddQuotes: React.FC<AddQuoteProps> = ({ isVisible, onClose }) => {
  const [title, setTitle] = useState('')
  const [header, setHeader] = useState('')
  const [description, setDescription] = useState('')

  // Mutation for adding a video
  const addQuoteMutation = useAddQuote()

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    // Prepare the payload
    const qouteData = {
      quote_header: header,
      quote_title: title,
      quote_content: description,
    }

    // Execute the mutation
    addQuoteMutation.mutate(qouteData, {
      onSuccess: () => {
        toast.success('Video uploaded successfully')
        onClose() // Close the modal on success
      },
      onError: (error: unknown) => {
        if (error instanceof Error) {
          toast.error(`Failed to add quote: ${error.message}`)
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
            <label htmlFor="">Qoute Header</label>
            <input
              type="text"
              placeholder="YouTube URL"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className="px-3 py-2 border rounded-md border-border_color focus:outline-none"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="">Quote Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 border rounded-md border-border_color focus:outline-none"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="">Quote Content</label>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 border rounded-md border-border_color focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={addQuoteMutation.isLoading}
            className="px-4 py-2 text-white bg-black rounded"
          >
            {addQuoteMutation.isLoading ? 'Uploading...' : 'Upload Video'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddQuotes
