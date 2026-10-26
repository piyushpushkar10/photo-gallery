import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import { favouritesReducer, loadFavourites, saveFavourites } from '../reducers/favouritesReducer'
import PhotoCard from './PhotoCard'

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [search, setSearch] = useState('')
  // Third argument lazily reads localStorage once, on the first render only
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites)

  useEffect(() => {
    saveFavourites(favourites)
  }, [favourites])

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value)
  }, [])

  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', id })
  }, [])

  const filteredPhotos = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return photos
    return photos.filter((photo) => photo.author.toLowerCase().includes(query))
  }, [photos, search])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Photo Gallery</h1>

      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search by author..."
        className="mb-8 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
      />

      {loading && (
        <div className="flex justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-100 p-4 text-center text-red-700">
          Failed to load photos: {error}
        </p>
      )}

      {!loading && !error && filteredPhotos.length === 0 && (
        <p className="text-center text-gray-500">No photos match "{search}".</p>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            isFavourite={favourites.includes(photo.id)}
            onToggleFavourite={handleToggleFavourite}
          />
        ))}
      </div>
    </div>
  )
}
