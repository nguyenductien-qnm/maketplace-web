export const createVoucherCacheActions = ({ queryKeys, queryClient }) => {
  const resetAll = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.root(),
      refetchType: 'active'
    })
  }

  const trimList = (max = 10) => {
    const listQueries = queryClient
      .getQueryCache()
      .findAll({ queryKey: queryKeys.listRoot() })

    if (listQueries.length <= max) return

    const sorted = [...listQueries].sort(
      (a, b) => a.state.dataUpdatedAt - b.state.dataUpdatedAt
    )

    const excess = sorted.slice(0, sorted.length - max)

    excess.forEach((q) => {
      queryClient.removeQueries({ queryKey: q.queryKey })
    })
  }

  return {
    resetAll,
    trimList
  }
}
