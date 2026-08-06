import { useCallback, useEffect, useState } from 'react'

/**
 * Wraps the browser Geolocation API.
 * status: 'idle' | 'pending' | 'granted' | 'denied' | 'unsupported'
 */
export function useGeolocation({ auto = true } = {}) {
  const [position, setPosition] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const request = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setStatus('unsupported')
      return
    }
    setStatus('pending')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        })
        setStatus('granted')
        setError(null)
      },
      (err) => {
        setStatus('denied')
        setError(err.message)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }, [])

  useEffect(() => {
    if (auto) request()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { position, status, error, request }
}
