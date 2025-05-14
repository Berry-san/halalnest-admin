interface UserCardProps {
  firstname: string
  lastname: string
  date: string
  user_id: string
  email: string
}

const UserCard: React.FC<UserCardProps> = ({ firstname, lastname, date }) => {
  //   const {
  //     data: user,
  //     isLoading,
  //     isError,
  //     error,
  //     refetch,
  //   } = useQuery(['user', user_id], () => apiService.getSingleUser(user_id), {
  //     enabled: false, // Do not automatically fetch on mount
  //   })

  return (
    <div className="p-10 border shadow-lg rounded-xl">
      <div className="gap-5">
        <p className="font-semibold text-black">
          {firstname} {lastname}
        </p>
        <p className="font-semibold text-gray">Joined: {date}</p>
      </div>
    </div>
  )
}

export default UserCard
