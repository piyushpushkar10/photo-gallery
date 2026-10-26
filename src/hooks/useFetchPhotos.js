import { useEffect, useState } from 'react'

const API_URL = 'https://picsum.photos/v2/list?limit=30'

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // AbortController cancels the request if the component unmounts mid-fetch
    const controller = new AbortController()

    async function fetchPhotos() {
      try {
        const res = await fetch(API_URL, { signal: controller.signal })
        // fetch only rejects on network failure, so check HTTP status manually
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
        const data = await res.json()
        setPhotos(data)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchPhotos()
    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}
