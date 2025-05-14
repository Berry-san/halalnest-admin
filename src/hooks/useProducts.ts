import { useQuery, useMutation, useQueryClient } from 'react-query'
import { productService } from '../api/productService'

// Hook to fetch all products
export const useAllProducts = () => {
  return useQuery('products', productService.fetchProductsList)
}

// Hook to fetch a single product by ID
export const useProduct = (productId: string | number) => {
  return useQuery(['product', productId], () =>
    productService.fetchProductDetails(productId)
  )
}

// Hook to add a new product
export const useAddProduct = () => {
  const queryClient = useQueryClient()
  return useMutation(productService.addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products')
    },
  })
}

// Hook to update an existing product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (productData: FormData) => productService.updateProduct(productData),
    {
      onSuccess: () => {
        // queryClient.invalidateQueries(['product', productId])
        queryClient.invalidateQueries('products')
      },
    }
  )
}

// Hook to delete a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (productId: string | number) => productService.deleteProduct(productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products')
      },
    }
  )
}
