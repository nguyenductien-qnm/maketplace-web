import { useRef } from 'react'

export const useFilterCompare = (fetchFunction) => {
  const lastFetchedFilters = useRef(null)

  const checkAndFetch = (filters) => {
    const cleanedFilters = {}
    for (const [key, value] of Object.entries(filters)) {
      if (value !== '' && value !== null && value !== undefined)
        cleanedFilters[key] = value
    }

    const current = JSON.stringify(cleanedFilters)
    const last = JSON.stringify(lastFetchedFilters.current)

    if (current !== last) {
      fetchFunction({ filters: cleanedFilters })
      lastFetchedFilters.current = cleanedFilters
      return true
    } else {
      return false
    }
  }

  return { checkAndFetch }
}
