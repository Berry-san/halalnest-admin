import { useState } from 'react'
import SearchBar from '../components/molecules/SearchBar'
import SelectDropdown from '../components/atoms/SelectDropdown'
import Table, { Column } from '../components/molecules/Table'
import Pagination from '../components/atoms/Pagination/Pagination'
import { useAllOrders, useUpdateOrderStatus } from '../hooks/useOrder'
import Modal from '../components/molecules/Modal'

const statusOptions = [
  { label: 'Received', value: 'received' },
  { label: 'Accepted', value: 'accepted' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
]

const Order = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  const [isOpen, setIsOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<number>(0)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const { mutate: updateOrderStatus } = useUpdateOrderStatus(newStatus)

  const handleRowClick = (row: any) => {
    console.log(row)
    setSelectedRow(row)
    setIsOpen(true)
  }

  const handleChangeStatus = (status: any) => {
    console.log(status)
    setNewStatus(status)

    const newStatusData = {
      newStatus: status,
      customerId: selectedRow.customer_id,
      merchantId: selectedRow.merchant_id,
    }
    updateOrderStatus(newStatusData)
    console.log(newStatusData)
  }

  const { data: orders = [], isLoading, isError } = useAllOrders()

  const reversedData = [...orders].reverse()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage: number = 10

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  // const indexOfLastItem: number = currentPage * itemsPerPage
  // const indexOfFirstItem: number = indexOfLastItem - itemsPerPage
  // const currentUsers = reversedData.slice(indexOfFirstItem, indexOfLastItem)

  const statusMapping: Record<string, number> = {
    accepted: 3,
    processing: 1,
    shipped: 2,
    delivered: 4,
  }

  const reverseStatusMapping: Record<number, string> = {
    3: 'Accepted',
    1: 'Processing',
    2: 'Shipped',
    4: 'Delivered',
  }

  const columns: Column[] = [
    { header: 'Order ID', key: 'order_reference' },
    {
      header: 'Date of order',
      key: 'insert_date',
      format: (value) => {
        const date = new Date(value)
        return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
          date
        )
      },
    },
    { header: 'Product', key: 'product_name' },
    {
      header: 'Amount',
      key: 'price',
      format: (value) =>
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'NGN',
        }).format(value),
    },
    {
      header: 'Quantity',
      key: 'quantity',
      format: (value) =>
        new Intl.NumberFormat('en-US', {
          style: 'decimal',
        }).format(value),
    },
    {
      header: 'Order status',
      key: 'merchant_status',
      format: (value) => {
        const status = reverseStatusMapping[value] || `Unknown (${value})`
        return (
          <span
            className={`px-2 py-1 rounded ${
              status === 'Accepted'
                ? 'bg-green-100 text-green-600'
                : status === 'Processing'
                ? 'bg-yellow-100 text-yellow-600'
                : status === 'Shipped'
                ? 'bg-blue-100 text-blue-600'
                : status === 'Delivered'
                ? 'bg-purple-100 text-purple-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {status}
          </span>
        )
      },
    },
  ]

  // Filter orders based on search term and selected status
  const filteredOrders = reversedData.filter((order) => {
    const trimmedTerm = searchTerm.trim().toLowerCase()
    const matchesSearch =
      order.product_name.toLowerCase().includes(trimmedTerm) ||
      order.order_reference.toLowerCase().includes(trimmedTerm)
    const matchesStatus = selectedStatus
      ? String(order.merchant_status) === String(statusMapping[selectedStatus])
      : true
    return matchesSearch && matchesStatus
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const paginatedOrders = filteredOrders.slice(
    indexOfFirstItem,
    indexOfLastItem
  )

  console.log(paginatedOrders)

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedStatus('')
  }

  if (isLoading) {
    return <div>Loading orders...</div>
  }

  if (isError) {
    return <div>Failed to load orders. Please try again later.</div>
  }

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Orders</h2>

        <div className="flex flex-col items-end gap-4 mb-4 md:flex-row">
          <SearchBar
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-4">
            <SelectDropdown
              options={statusOptions}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            />
            <button
              onClick={clearFilters}
              className="w-40 px-4 py-2 text-white rounded bg-secondary"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="relative">
          {paginatedOrders.length > 0 ? (
            <>
              <Table
                columns={columns}
                data={paginatedOrders}
                renderRowActions={(row) => (
                  <div className="flex gap-2">
                    <td className="px-6 text-sm text-gray-700 whitespace-nowrap">
                      <button
                        className="px-4 py-2 font-bold text-white capitalize rounded-md bg-secondary"
                        onClick={() => handleRowClick(row)}
                      >
                        update status
                      </button>
                    </td>
                  </div>
                )}
              />
              <div className="flex justify-center mt-2">
                <Pagination
                  currentPage={currentPage}
                  onPageChange={paginate}
                  totalCount={filteredOrders.length}
                  pageSize={itemsPerPage}
                  siblingCount={1}
                />
              </div>
            </>
          ) : (
            <div className="text-center">No orders found.</div>
          )}
        </div>
      </div>
      <Modal isVisible={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col w-96 text-secondary">
          <div className="flex items-center justify-between px-6 py-2 text-xl border-b">
            <h2>Order No: {selectedRow?.order_reference}</h2>
            <button onClick={() => setIsOpen(false)}>
              {/* close svg */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="flex flex-col px-6 py-2 space-y-3">
            <p>Product Name: {selectedRow?.product_name}</p>
            <p>
              Order Date:{' '}
              {new Date(selectedRow?.insert_date).toLocaleDateString()}
            </p>
            <p>Total Amount: {Number(selectedRow?.price).toLocaleString()}</p>
            {/* <button
              className="px-4 py-2 mt-4 text-white rounded bg-secondary"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button> */}
            <select
              name="status"
              id="status"
              onChange={(e) => handleChangeStatus(e.target.value)}
              className="px-4 py-2 capitalize border rounded-md"
            >
              <option value="1">Pending</option>
              <option value="2">Delivered</option>
              <option value="3">Cancelled</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Order
