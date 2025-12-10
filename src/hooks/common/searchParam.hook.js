import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const useCustomSearchParams = ({ defaultParams }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [paramsReady, setParamsReady] = useState(false)

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams)
    let needsUpdate = false

    const fixedDefaults = {
      page: '1',
      limit: '10',
      sort_by: 'newest'
    }

    for (const key in defaultParams) {
      if (!searchParams.get(key)) {
        newParams.set(key, defaultParams[key])
        needsUpdate = true
      }
    }

    for (const key in fixedDefaults) {
      if (!searchParams.get(key)) {
        newParams.set(key, fixedDefaults[key])
        needsUpdate = true
      }
    }

    if (needsUpdate) {
      setSearchParams(newParams, { replace: true, preventScrollReset: true })
    }

    setParamsReady(true)
  }, [])

  const params = useMemo(() => {
    const entries = Object.fromEntries(searchParams.entries())
    return {
      ...entries,
      page: entries.page ?? '1',
      limit: entries.limit ?? '10'
    }
  }, [searchParams])

  const setParams = useCallback(
    (p) => {
      const newParams = new URLSearchParams(p)

      Array.from(newParams.entries()).forEach(([key, value]) => {
        if (value === '' || value == null || value == 'undefined') {
          newParams.delete(key)
        }
      })

      setSearchParams(newParams, { replace: true, preventScrollReset: true })
    },
    [setSearchParams]
  )

  return [params, paramsReady, setParams]
}

export default useCustomSearchParams
