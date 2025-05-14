import { Quotes } from '../shared.types'
import { apiBase } from './apiBase'

export const quoteService = {
  async getQuotes(): Promise<Quotes[]> {
    try {
      const response = await apiBase.get('/quote/quote_list')
      return response.data.quotes
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async getSingleQuote(quoteId: string): Promise<void> {
    try {
      const response = await apiBase.get(`quote/${quoteId}`)
      return response.data.quoteDetails
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async addQuote(quoteData: {
    quote_header: string
    quote_title: string
    quote_content: string
  }): Promise<void> {
    try {
      const response = await apiBase.post('/quote/add_quote', quoteData)
      return response.data.quotes
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async updateQuote(quoteId: string, quoteData: Quotes): Promise<void> {
    try {
      await apiBase.post(`quote/update_quote/${quoteId}`, quoteData)
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },

  async deleteQuote(quoteId: string): Promise<void> {
    try {
      await apiBase.delete(`quote/delete_quote/${quoteId}`)
    } catch (error) {
      console.error('Error fetching products list:', error)
      throw new Error('Could not fetch products list')
    }
  },
}
