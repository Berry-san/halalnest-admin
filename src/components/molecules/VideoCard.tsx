const getYouTubeVideoId = (url: string): string | null => {
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regExp)
  return match ? match[1] : null
}

const getYouTubeThumbnailUrl = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

const VideoCard: React.FC<{
  url: string
  title: string
  date: string | undefined
}> = ({ url, title, date }) => {
  const videoId = getYouTubeVideoId(url)
  const isYouTube = !!videoId
  const thumbnailUrl = isYouTube ? getYouTubeThumbnailUrl(videoId!) : ''

  const handleClick = () => {
    if (isYouTube) {
      window.open(
        `https://www.youtube.com/watch?v=${videoId}`,
        '_blank',
        'noopener,noreferrer'
      )
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="flex items-center">
      <div
        className="w-full border rounded-lg shadow-lg cursor-pointer"
        onClick={handleClick}
      >
        <section className="relative w-full h-48">
          <img
            src={thumbnailUrl}
            alt="Video Thumbnail"
            className="object-cover w-full h-48 rounded-t-lg shadow-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black rounded-t-lg bg-opacity-40">
            <div>
              <svg
                fill="#fff"
                height="48"
                viewBox="0 0 48 48"
                width="48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h48v48H0z" fill="none" />
                <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z" />
              </svg>
            </div>
          </div>
        </section>

        <section className="flex justify-between px-5 py-3 dark:bg-white dark:text-black">
          <div className="flex flex-col gap-0">
            <h2 className="font-semibold text-md">{title}</h2>
            <p className="text-gray">{date}</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default VideoCard
