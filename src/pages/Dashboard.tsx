import axios from 'axios'

const Dashboard = () => {
  const testfetch = async () => {
    const response = await axios.get('/api/hialal/entertain/video_list', {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '2aa1513c-8998-454e-9d52-fa95b47fb142',
      },
    })
    console.log(response)
  }

  testfetch()

  const DashboardItems = [
    {
      id: 1,
      totalUsers: 'Total users',
      // randomNumber: adminSummary?.noOfUsers || 0,
    },
    {
      id: 2,
      totalUsers: 'Total Video Categories',
      // randomNumber: adminSummary?.noOfVideoCategories || 0,
    },
    {
      id: 3,
      totalUsers: 'Total Videos',
      // randomNumber: adminSummary?.noOfVideos || 0,
    },
    {
      id: 4,
      totalUsers: 'Total Articles',
      // randomNumber: adminSummary?.noOfArticles || 0,
    },
  ]

  return (
    <div className="">
      <section className="grid grid-cols-1 gap-5 my-5 md:grid-cols-2 lg:grid-cols-4">
        {DashboardItems.map((item, index) => (
          <div
            className="flex items-center h-32 px-5 bg-white border rounded-xl dark:bg-transparent"
            key={index}
          >
            <div className="flex items-center justify-between">
              <div className="font-semibold">
                <p className="text-2xl">6578</p>
                <p className="text-base">{item.totalUsers}</p>
              </div>
              <div>{/* <img src={users} className="w-7 h-7" alt="" /> */}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Dashboard
