// orderService.ts
import { apiBase } from './apiBase'
import {
  UpdateOrderStatusRequest,
  OrderHistoryItem,
  MerchantOrder,
  DeliveryStatus,
} from '../shared.types'

const BASE_URL = ''

export const orderService = {
  //   // Fetch order details by order ID
  //   async fetchOrderDetails(orderId: number): Promise<OrderDetails> {
  //     const response = await apiBase.get(`${BASE_URL}/order_details/${orderId}`)
  //     return response.data
  //   },

  // Update order status
  async updateOrderStatus(
    newStatusData: UpdateOrderStatusRequest
  ): Promise<void> {
    await apiBase.put(
      `${BASE_URL}/store_transaction/update_merchant_status`,
      newStatusData
    )
  },

  // Fetch current order status
  async fetchOrderStatus(orderId: number): Promise<string> {
    const response = await apiBase.get(`${BASE_URL}/order_status/${orderId}`)
    return response.data
  },

  // Fetch order status history
  async fetchOrderStatusHistory(orderId: number): Promise<OrderHistoryItem[]> {
    const response = await apiBase.get(
      `${BASE_URL}/order_status_history/${orderId}`
    )
    return response.data
  },

  // Fetch delivery status
  async fetchDeliveryStatus(orderId: number): Promise<DeliveryStatus> {
    const response = await apiBase.get(`${BASE_URL}/delivery_status/${orderId}`)
    return response.data
  },

  // Fetch all orders
  async fetchAllOrders(): Promise<MerchantOrder[]> {
    const response = await apiBase.get(
      `${BASE_URL}/store_transaction/all_merchant_details`
    )
    return response.data.schools
  },
}
