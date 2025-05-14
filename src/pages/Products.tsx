import React, { useState } from 'react'
// import SelectDropdown from '../components/atoms/SelectDropdown'
import SearchBar from '../components/molecules/SearchBar'
import ProductTable from '../components/molecules/ProductTable'
import { Column } from '../components/molecules/Table'
import { useAllProducts } from '../hooks/useProducts'
// import { useNavigate } from 'react-router-dom'

const Products: React.FC = () => {
  // const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const { data: products = [], isLoading, error } = useAllProducts()

  if (!products) {
    return <div>Loading product data...</div>
  }

  const columns: Column[] = [
    { header: 'Product Info', key: 'productInfo' },
    { header: 'Price', key: 'product_price' },
    { header: 'Inventory', key: 'product_quantity' },
    { header: 'Category', key: 'category_name' },
  ]

  // const handleEditProduct = (product: Product) => {
  //   navigate(`/products/edit-product/${product.product_id}`, {
  //     state: { product },
  //   })
  // }

  // const handleAddProduct = () => {
  //   navigate(`/products/add-product`)
  // }

  // Mutation hook for updating product status
  // const updateProductMutation = useUpdateProduct()

  // const deleteProductMutation = useDeleteProduct()

  // Handle status toggle for each product
  // const handleToggleStatus = (
  //   productId: number | string,
  //   newStatus: string
  // ) => {
  //   // Find the full product details from the products list
  //   const productToUpdate = products.find(
  //     (product) => product.product_id === productId
  //   )

  //   if (!productToUpdate) return // If product is not found, exit

  //   // Create a new FormData object and populate it with the current product details
  //   const formData = new FormData()
  //   formData.append('productId', String(productToUpdate.product_id))
  //   formData.append('productName', productToUpdate.product_name || '')
  //   formData.append(
  //     'shortProductName',
  //     productToUpdate.short_product_name || ''
  //   )
  //   formData.append('merchantId', productToUpdate.merchant_id || '')
  //   formData.append('categoryId', productToUpdate.category_id || '')
  //   formData.append('subCategoryId', productToUpdate.sub_category_id || '')
  //   formData.append(
  //     'productDescription',
  //     productToUpdate.product_description || ''
  //   )
  //   formData.append('productPrice', productToUpdate.product_price || '')
  //   formData.append('productModel', productToUpdate.product_model || '')
  //   formData.append('productColor', productToUpdate.product_color || '')
  //   formData.append('productQuantity', String(productToUpdate.product_quantity))
  //   formData.append('vat', String(productToUpdate.vat || ''))
  //   formData.append(
  //     'productDiscountPercentage',
  //     String(productToUpdate.product_discount_percentage || '')
  //   )
  //   formData.append('expiryDate', productToUpdate.expiry_date || '')
  //   formData.append('status', newStatus) // Update the status field

  //   const productImageURL = getProductImageURL(productToUpdate.product_picture)
  //   if (productImageURL) {
  //     formData.append('productPicture', productImageURL)
  //   }

  //   // Submit the updated product data
  //   updateProductMutation.mutate({
  //     updateData: formData,
  //   })
  // }

  // Handle deletion of a product
  // const handleDeleteProduct = (productId: number | string) => {
  //   deleteProductMutation.mutate(productId)
  // }

  // Filter table data based on search term and selected status
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.product_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    // const matchesStatus = selectedStatus
    //   ? product.category_name === selectedStatus
    //   : true
    // return matchesSearch && matchesStatus
    return matchesSearch
  })

  if (isLoading) return <div>Loading products...</div>
  if (error) return <div>Error loading products</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">My Products</h2>
      </div>
      <div className="flex items-end gap-4 mb-8">
        <SearchBar
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <div className="space-x-4">
          <button
            onClick={handleAddProduct}
            className="w-40 px-4 py-2 text-white rounded bg-secondary"
          >
            Add Product
          </button>
        </div> */}
      </div>
      <div className="relative">
        <ProductTable
          columns={columns}
          data={filteredProducts}
          // handleToggleStatus={handleToggleStatus}
          // handleEditProduct={handleEditProduct}
          // handleDeleteProduct={handleDeleteProduct} // Pass delete handler
        />
      </div>
    </div>
  )
}

export default Products
