'use client'

import { useState } from 'react'
import SearchBar from '../components/molecules/SearchBar'
import { formatDate } from '../utils/formatters'
import { useGetReports } from '../hooks/useAdmin'

const ReportedIssues = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState<string>('') // format: YYYY-MM-DD

  const { data: issues = [], isLoading } = useGetReports(selectedDate)
  console.log(issues)

  const filteredIssues =
    issues?.filter(
      (issue) =>
        issue.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.username.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Reported Issues</h2>

      <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-center">
        <SearchBar
          placeholder="Search by email or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section className="grid grid-cols-1 gap-5 mt-4 lg:grid-cols-3 2xl:grid-cols-4">
          {filteredIssues.map((issue, index) => (
            <div key={index} className="">
              <div className="h-56 p-4 mb-4 overflow-auto bg-gray-200 border">
                <p>{issue.username}</p>
                <p>{issue.email}</p>
                <p>Subject : {issue.SUBJECT}</p>
                <p>Message : {issue.message}</p>
                <p>{formatDate(issue.time_in)}</p>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default ReportedIssues
