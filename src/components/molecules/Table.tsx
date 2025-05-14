export interface Column<T = Record<string, any>> {
  header: string
  key: keyof T
  format?: (value: any, row?: T) => React.ReactNode
}

interface TableProps<T> {
  columns: Column<T>[]
  data: Array<T>
  renderRowActions?: (row: T) => React.ReactNode
}

function Table<T extends Record<string, any>>({
  columns,
  data,
  renderRowActions,
}: TableProps<T>) {
  return (
    <>
      <div className="mt-4 overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-300 border-b">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase "
                >
                  {column.header}
                </th>
              ))}
              <th className="px-6 py-3"> </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                // onClick={() => handleRowClick(row)}
                className="cursor-pointer"
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="max-w-[10rem] px-6 py-4 text-sm text-gray-700 capitalize truncate whitespace-nowrap"
                  >
                    {column.format
                      ? column.format(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}

                {renderRowActions && (
                  <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                    {renderRowActions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table
