import { useQuery, useMutation, useQueryClient } from 'react-query'

import { quoteService } from '../api/quoteService'
import { Quotes } from '../shared.types'
import { toast } from 'react-toastify'

// Hook to fetch all quotes
export const useQuotes = () => {
  return useQuery<Quotes[], Error>('quotes', quoteService.getQuotes)
}

// Hook to fetch a single quote by ID
export const useQuote = (quoteId: string) => {
  return useQuery(['quotes', quoteId], () =>
    quoteService.getSingleQuote(quoteId)
  )
}

// Hook to add a new quote
export const useAddQuote = () => {
  const queryClient = useQueryClient()
  return useMutation((quoteData: Quotes) => quoteService.addQuote(quoteData), {
    onSuccess: () => {
      queryClient.invalidateQueries('quotes')
    },
    onError: (error: Error) => {
      toast.error(`Failed to add quote: ${error.message}`)
    },
  })
}

// Hook to update an existing quote
export const useUpdateQuote = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ quoteId, quoteData }: { quoteId: string; quoteData: Quotes }) =>
      quoteService.updateQuote(quoteId, quoteData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('quotes')
      },
      onError: (error: Error) => {
        toast.error(`Failed to update quote: ${error.message}`)
        console.error(error)
      },
    }
  )
}

// Hook to delete a quote
export const useDeleteQuote = () => {
  const queryClient = useQueryClient()
  return useMutation((quoteId: string) => quoteService.deleteQuote(quoteId), {
    onSuccess: () => {
      queryClient.invalidateQueries('quotes')
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete quote: ${error.message}`)
    },
  })
}
