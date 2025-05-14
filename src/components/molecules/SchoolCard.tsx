const SchoolCard: React.FC<{
  image_1: string
  school_name: string
  school_scope: string
  school_phonenumber?: string
  address: string
  living_facility?: string
}> = ({
  image_1,
  school_name,
  school_scope,
  address,
  living_facility,
  school_phonenumber,
}) => {
  return (
    <div className="flex items-center">
      <div className="w-full border rounded-lg shadow-lg">
        <section className="relative w-full h-48">
          {image_1 ? (
            <img
              src={image_1}
              alt={school_name}
              className="object-cover w-full h-48 rounded-t-lg"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
          )}
        </section>

        <section className="flex justify-between px-5 py-3 dark:bg-white dark:text-black">
          <div className="flex flex-col gap-0">
            <h2 className="font-semibold text-md">{school_name}</h2>
            <p className="text-gray">{address}</p>
            <p className="text-gray">Phone: {school_phonenumber}</p>
            <p className="text-gray">Scope: {school_scope}</p>
            <p className="text-gray">Living facility: {living_facility}</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SchoolCard
