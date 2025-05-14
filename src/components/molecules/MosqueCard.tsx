const MosqueCard: React.FC<{
  image: string
  name: string
  address: string
  air_condition: string
  female_praying_section: string
  toilet: string
}> = ({
  image,
  name,
  address,
  air_condition,
  female_praying_section,
  toilet,
}) => {
  return (
    <div className="flex items-center">
      <div className="w-full border rounded-lg shadow-lg">
        <section className="relative w-full h-48">
          {image ? (
            <img
              src={image}
              alt={name}
              className="object-cover w-full h-48 rounded-t-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
          )}
        </section>

        <section className="flex justify-between h-48 px-5 py-3 dark:bg-white dark:text-black">
          <div className="flex flex-col gap-0">
            <h2 className="font-semibold text-md">{name}</h2>
            <p className="text-gray">{address}</p>
            <p className="text-gray">Air conditioning: {air_condition}</p>
            <p className="text-gray">
              Female praying section: {female_praying_section}
            </p>
            <p className="text-gray">Toilet: {toilet}</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MosqueCard
