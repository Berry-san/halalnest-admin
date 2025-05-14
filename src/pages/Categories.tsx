'use client'

import { useState } from 'react'
import {
  useAllCategories,
  useAllSubcategories,
  useAddCategory,
  useAddSubcategory,
  useDeleteCategory,
  useDeleteSubcategory,
} from '../hooks/useCategory'
import SearchBar from '../components/molecules/SearchBar'
import { AddCategoryRequest, AddSubcategoryRequest } from '../shared.types'
import Modal from '../components/molecules/Modal'
import { toast } from 'react-toastify'

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  )

  const [categoryData, setCategoryData] = useState<AddCategoryRequest>({
    categoryName: '',
    description: '',
  })

  const [subcategoryData, setSubcategoryData] = useState<AddSubcategoryRequest>(
    {
      subcategoryName: '',
      description: '',
      categoryId: 0,
    }
  )

  const {
    data: categories = [],
    error: categoryError,
    isLoading: isLoadingCat,
  } = useAllCategories()

  const {
    data: subcategories = [],
    error: subcategoryError,
    isLoading: isLoadingSub,
  } = useAllSubcategories()

  const addCategoryMutation = useAddCategory()
  const addSubcategoryMutation = useAddSubcategory()
  const deleteCategoryMutation = useDeleteCategory()
  const deleteSubcategoryMutation = useDeleteSubcategory()

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const searchResults = categories.filter((category) =>
    category.category_name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
  )

  const handleAddCategory = () => {
    addCategoryMutation.mutate(categoryData, {
      onSuccess: () => {
        toast.success('Category added successfully!')
        setShowCategoryModal(false)
        setCategoryData({ categoryName: '', description: '' })
      },
      onError: (error) => {
        console.error('Failed to add category:', error)
      },
    })
  }

  const handleDeleteCategory = (categoryId: number) => {
    deleteCategoryMutation.mutate(categoryId, {
      onSuccess: () => {
        toast.success('Category deleted successfully!')
      },
      onError: (error) => {
        console.error('Failed to delete category:', error)
      },
    })
  }

  const handleOpenSubcategoryModal = (categoryId: number) => {
    setSelectedCategoryId(categoryId)
    setShowSubcategoryModal(true)
    setSubcategoryData({ subcategoryName: '', description: '', categoryId })
  }

  const handleAddSubcategory = () => {
    if (!selectedCategoryId) return
    addSubcategoryMutation.mutate(subcategoryData, {
      onSuccess: () => {
        toast.success('Subcategory added successfully!')
        setShowSubcategoryModal(false)
        setSubcategoryData({
          subcategoryName: '',
          description: '',
          categoryId: 0,
        })
      },
      onError: (error) => {
        console.error('Failed to add subcategory:', error)
      },
    })
  }

  const handleDeleteSubcategory = (subcategoryId: number) => {
    deleteSubcategoryMutation.mutate(subcategoryId, {
      onSuccess: () => {
        toast.success('Subcategory deleted successfully!')
      },
      onError: (error) => {
        console.error('Failed to delete subcategory:', error)
      },
    })
  }

  if (isLoadingSub || isLoadingCat)
    return <p className="text-center">Loading...</p>
  if (subcategoryError || categoryError)
    return <p className="text-center text-red-500">Error loading data.</p>

  return (
    <>
      <div className="max-w-4xl p-6 mx-auto">
        <h2 className="mb-6 text-2xl font-bold text-center">Categories</h2>

        <div className="flex flex-col items-end gap-4 mb-4 md:flex-row">
          <SearchBar
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            className="w-56 px-6 py-2 mx-auto text-white rounded bg-secondary"
            onClick={() => setShowCategoryModal(true)}
          >
            + Add Category
          </button>
        </div>

        <div className="space-y-4">
          {searchResults.map((category) => (
            <div
              key={category.category_id}
              className="p-4 bg-white border rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {category.category_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 text-white bg-red-500 rounded"
                    onClick={() => handleDeleteCategory(category.category_id)}
                  >
                    Delete
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-300 rounded"
                    onClick={() => toggleCategory(category.category_id)}
                  >
                    {expandedCategory === category.category_id
                      ? 'Hide'
                      : 'Show'}
                  </button>
                </div>
              </div>

              {expandedCategory === category.category_id && (
                <div className="pt-3 mt-3 border-t">
                  <h4 className="mb-2 font-semibold text-md">Subcategories</h4>
                  <ul className="space-y-2">
                    {subcategories
                      .filter((sub) => sub.category_id === category.category_id)
                      .map((sub) => (
                        <li
                          key={sub.subcategory_id}
                          className="flex items-center justify-between p-2 border rounded"
                        >
                          <span>{sub.subcategory_name}</span>
                          <div className="flex gap-2">
                            <button
                              className="px-3 py-1 text-white bg-red-500 rounded"
                              onClick={() =>
                                handleDeleteSubcategory(sub.subcategory_id)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                  </ul>
                  <button
                    className="px-4 py-2 mt-3 text-white rounded bg-secondary"
                    onClick={() =>
                      handleOpenSubcategoryModal(category.category_id)
                    }
                  >
                    + Add Subcategory
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Category Modal */}
      <Modal
        isVisible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
      >
        <div>
          <h3 className="mb-4 text-lg font-semibold">Add Category</h3>
          <input
            type="text"
            placeholder="Category Name"
            value={categoryData.categoryName}
            onChange={(e) =>
              setCategoryData({ ...categoryData, categoryName: e.target.value })
            }
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={categoryData.description}
            onChange={(e) =>
              setCategoryData({ ...categoryData, description: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <button
            className="px-4 py-2 mt-3 text-white rounded bg-secondary"
            onClick={handleAddCategory}
          >
            Add
          </button>
        </div>
      </Modal>

      {/* Subcategory Modal */}
      <Modal
        isVisible={showSubcategoryModal}
        onClose={() => setShowSubcategoryModal(false)}
      >
        <div>
          <h3 className="mb-4 text-lg font-semibold">Add Subcategory</h3>
          <input
            type="text"
            placeholder="Subcategory Name"
            value={subcategoryData.subcategoryName}
            onChange={(e) =>
              setSubcategoryData({
                ...subcategoryData,
                subcategoryName: e.target.value,
              })
            }
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            className="px-4 py-2 mt-3 text-white rounded bg-secondary"
            onClick={handleAddSubcategory}
          >
            Add
          </button>
        </div>
      </Modal>
    </>
  )
}

export default Categories
