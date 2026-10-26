export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  // Request a smaller image instead of the full-resolution original
  const imageUrl = `https://picsum.photos/id/${photo.id}/400/300`

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <img
        src={imageUrl}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        className="h-48 w-full object-cover"
      />
      <div className="flex items-center justify-between p-3">
        <p className="truncate text-sm font-medium text-gray-800">{photo.author}</p>
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className="rounded-full p-1 hover:bg-gray-100"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-6 w-6 ${isFavourite ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-gray-400'}`}
            strokeWidth="2"
          >
            <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4.5 4.5 8.5C19 16.65 12 21 12 21z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
