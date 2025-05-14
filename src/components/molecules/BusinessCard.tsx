const BusinessCard: React.FC<{
  image: string
  business_name: string
  business_phonenumber: string
  business_address: string
  hca_certifaction: string
}> = ({
  image,
  business_name,
  business_address,
  hca_certifaction,
  business_phonenumber,
}) => {
  return (
    <div className="flex items-center">
      <div className="w-full border rounded-lg shadow-lg">
        <section className="relative w-full h-48">
          {image ? (
            <img
              src={image}
              alt={business_name}
              className="object-cover w-full h-48 rounded-t-lg"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
          )}
        </section>

        <section className="flex justify-between h-40 px-5 py-3 dark:bg-white dark:text-black">
          <div className="flex flex-col gap-0">
            <h2 className="font-semibold text-md">{business_name}</h2>
            <p className="text-gray">{business_address}</p>
            <p className="text-gray">Phone: {business_phonenumber}</p>
            <p className="text-gray">HCA: {hca_certifaction}</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default BusinessCard
