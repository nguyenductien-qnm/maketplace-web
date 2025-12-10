import IGNORE_KEY from '~/constant/ignoreKey.const'

const getActiveFilters = (params) => {
  return Object.entries(params).filter(
    ([k, v]) =>
      v !== '' && v !== null && v !== undefined && !IGNORE_KEY.includes(k)
  ).length
}

export default getActiveFilters
