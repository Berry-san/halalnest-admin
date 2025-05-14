import { useState } from 'react'
import SearchBar from '../components/molecules/SearchBar'
import { formatDate } from '../utils/formatters'

const issues = [
  {
    email: 'adunola142@gmail.com',
    username: 'OLasubomi',
    SUBJECT: 'intresting App ',
    message: 'i love the app',
    time_in: '2024-11-01T16:03:35.000Z',
  },
  {
    email: 'amusa@gmail.com',
    username: 'tobi amusa',
    SUBJECT: 'Welcome ',
    message: 'when are we welxoming him to our house',
    time_in: '2024-11-04T11:03:19.000Z',
  },
  {
    email: 'amusa@gmail.com',
    username: 'tobi amusa',
    SUBJECT: 'taye',
    message: 'welcome to tobi world',
    time_in: '2024-11-04T11:14:05.000Z',
  },
  {
    email: 'amusa@gmail.com',
    username: 'tobi amusa',
    SUBJECT: 'food',
    message: 'when are you getting your meal ',
    time_in: '2024-11-04T11:34:44.000Z',
  },
  {
    email: 'adunola142@gmail.com',
    username: 'OLasubomi',
    SUBJECT: 'intresting App ',
    message: 'i love the app',
    time_in: '2024-11-04T15:30:50.000Z',
  },
  {
    email: 'y_gbenga@yahoo.com',
    username: 'Yusuf Adekoya',
    SUBJECT: 'test',
    message: 'gfhjyh ghvgj',
    time_in: '2025-02-12T09:16:06.000Z',
  },
  {
    email: 'amusa@gmail.com',
    username: 'tobi amusa',
    SUBJECT: 'welcom',
    message: 'okay',
    time_in: '2025-05-12T16:06:28.000Z',
  },
]

const ReportedIssues = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredIssues = issues
    ? issues.filter((issue) => {
        return (
          issue.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
    : []

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Reported Issues</h2>

      <SearchBar
        placeholder="Search schools..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

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
    </div>
  )
}

export default ReportedIssues
