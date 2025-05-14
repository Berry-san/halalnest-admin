import { useState } from 'react'
import Pagination from '../components/atoms/Pagination/Pagination'
import SearchBar from '../components/molecules/SearchBar'
import Table, { Column } from '../components/molecules/Table'
import { useAllMerchants } from '../hooks/useMerchant'

const Merchants = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: merchants = [], isLoading, isError } = useAllMerchants()

  const reversedData = [...merchants].reverse()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage: number = 10

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  const filteredOrders = reversedData.filter((order) => {
    const trimmedTerm = searchTerm.trim().toLowerCase()
    const matchesSearch =
      order.names.toLowerCase().includes(trimmedTerm) ||
      order.email.toLowerCase().includes(trimmedTerm)

    return matchesSearch
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const paginatedOrders = filteredOrders.slice(
    indexOfFirstItem,
    indexOfLastItem
  )

  const columns: Column[] = [
    { header: 'Merchant Name', key: 'names' },
    { header: 'Email', key: 'email' },
    { header: 'Address', key: 'address' },
    {
      header: 'Date of Registration',
      key: 'registered_at',
      format: (value) => {
        const date = new Date(value)
        return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
          date
        )
      },
    },
    { header: 'Status', key: 'active_status' },
  ]

  if (isLoading) {
    return <div>Loading merchants...</div>
  }

  if (isError) {
    return <div>Failed to load merchants. Please try again later.</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Merchants</h2>

      <div className="flex flex-col items-end gap-4 mb-4 md:flex-row">
        <SearchBar
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="relative">
        {paginatedOrders.length > 0 ? (
          <>
            <Table
              columns={columns}
              data={paginatedOrders}
              renderRowActions={(row) => (
                <div className="flex gap-4">
                  <button
                    className="px-6 py-1 text-sm text-white rounded bg-secondary"
                    disabled={row.active_status === 'active'}
                    // onClick={() => handleViewOrder(row.order_reference)}
                    // onClick={}
                  >
                    Activate
                  </button>

                  <button
                    className="px-6 py-1 text-sm text-white bg-red-500 rounded"
                    // onClick={() => handleEditOrder(row.order_reference)}
                    disabled={row.active_status === 'deactivated'}
                  >
                    Deactivate
                  </button>
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
          <div className="text-center">No merchants found.</div>
        )}
      </div>
    </div>
  )
}

export default Merchants
