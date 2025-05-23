'use client'

import React, { useState } from 'react'
import {
  useQuotes,
  useAddQuote,
  useUpdateQuote,
  useDeleteQuote,
} from '../hooks/useQuotes'
import { toast } from 'react-toastify'
import QuotesCard from '../components/molecules/QuotesCard'
import Modal from '../components/molecules/Modal'
import DeleteConfirmationModal from '../components/molecules/DeleteConfirmationModal'
import Button from '../components/atoms/Button'
import SearchBar from '../components/molecules/SearchBar'
import { Loader } from 'lucide-react'
import InputField from '../components/atoms/InputField'
import TextAreaField from '../components/atoms/TextAreaField'

interface Quote {
  quote_id?: string
  quote_header: string
  quote_title: string
  quote_content: string
}

const QuranVerse: React.FC = () => {
  const { data: quotes, isLoading } = useQuotes()
  const addQuoteMutation = useAddQuote()
  const updateQuoteMutation = useUpdateQuote()
  const deleteQuoteMutation = useDeleteQuote()

  const [search, setSearch] = useState('')
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [quoteData, setQuoteData] = useState<Quote>({
    quote_header: '',
    quote_title: '',
    quote_content: '',
  })

  // ✅ Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setQuoteData((prev) => ({ ...prev, [name]: value }))
  }

  // ✅ Open Add Quote Modal
  const openAddQuoteModal = () => {
    setIsEditing(false)
    setQuoteData({
      quote_header: '',
      quote_title: '',
      quote_content: '',
    })
    setShowQuoteModal(true)
  }

  // ✅ Open Edit Quote Modal
  const openEditQuoteModal = (quote: Quote) => {
    setIsEditing(true)
    setQuoteData(quote) // ✅ Ensures `quote_id` is included for update
    setShowQuoteModal(true)
  }

  // ✅ Add a new quote
  const handleAddQuote = (e: React.FormEvent) => {
    e.preventDefault() // ❌ Prevents Refresh

    // ✅ Ensure required fields are not empty
    if (
      !quoteData.quote_header ||
      !quoteData.quote_title ||
      !quoteData.quote_content
    ) {
      toast.error('All fields are required!')
      return
    }

    addQuoteMutation.mutate(
      {
        quote_header: quoteData.quote_header,
        quote_title: quoteData.quote_title,
        quote_content: quoteData.quote_content,
      },
      {
        onSuccess: () => {
          toast.success('Quote added successfully!')
          setShowQuoteModal(false)
        },
        onError: (error) => {
          toast.error(`Error: ${error}`)
        },
      }
    )
  }

  // ✅ Update an existing quote
  const handleUpdateQuote = (e: React.FormEvent) => {
    e.preventDefault() // ❌ Prevents Refresh

    if (!quoteData.quote_id) {
      toast.error('Error: Missing `quote_id` for update!')
      return
    }

    updateQuoteMutation.mutate(
      {
        quoteId: quoteData.quote_id, // ✅ Send ID separately
        quoteData: {
          quote_header: quoteData.quote_header,
          quote_title: quoteData.quote_title,
          quote_content: quoteData.quote_content,
        },
      },
      {
        onSuccess: () => {
          toast.success('Quote updated successfully!')
          setShowQuoteModal(false)
        },
        onError: (error) => {
          toast.error(`Error: ${error}`)
        },
      }
    )
  }

  // ✅ Delete confirmation modal
  const openDeleteModal = (quote: Quote) => {
    setSelectedQuote(quote)
    setShowDeleteModal(true)
  }

  const handleDeleteQuote = () => {
    if (!selectedQuote?.quote_id) return
    deleteQuoteMutation.mutate(selectedQuote.quote_id, {
      onSuccess: () => {
        toast.success('Quote deleted successfully!')
        setShowDeleteModal(false)
      },
    })
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader className="w-10 h-10 text-gray-900 animate-spin" />
      </div>
    )

  return (
    <>
      <h2 className="text-2xl font-bold text-center">Quran Quotes</h2>

      <div className="flex flex-col items-center my-5 space-y-3 md:flex-row md:space-y-0">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search for a quote"
        />
        <Button text="Upload a Quote" onClick={openAddQuoteModal} />
      </div>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {quotes?.map((quote) => (
          <QuotesCard
            key={quote.quote_id}
            {...quote}
            handleEdit={() => openEditQuoteModal(quote)}
            handleDelete={() => openDeleteModal(quote)}
          />
        ))}
      </section>

      {/* ✅ Add / Edit Modal */}
      <Modal
        isVisible={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
      >
        <form
          onSubmit={isEditing ? handleUpdateQuote : handleAddQuote}
          className="flex flex-col gap-4 w-80"
        >
          {isEditing && (
            <InputField
              label="Quote ID"
              name="quote_id"
              value={quoteData.quote_id || ''}
              onChange={handleInputChange}
              disabled // ✅ Prevents ID from being modified
              className="hidden"
            />
          )}

          <InputField
            label="Quote Header"
            name="quote_header"
            value={quoteData.quote_header}
            onChange={handleInputChange}
            placeholder="Quote Header"
          />
          <InputField
            label="Quote Title"
            name="quote_title"
            value={quoteData.quote_title}
            onChange={handleInputChange}
            placeholder="Quote Title"
          />
          <TextAreaField
            label="Quote Content"
            name="quote_content"
            value={quoteData.quote_content}
            onChange={handleInputChange}
            placeholder="Quote Content"
          />

          <Button
            text={isEditing ? 'Update Quote' : 'Add Quote'}
            type="submit"
          />
        </form>
      </Modal>

      {/* ✅ Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isVisible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteQuote}
        itemName={selectedQuote?.quote_title || 'this quote'}
      />
    </>
  )
}

export default QuranVerse
