import VoucherQueryKeys from './voucher.queryKeys'

export const trimVoucherListCache = (queryClient, max = 10) => {
  const listQueries = queryClient
    .getQueryCache()
    .findAll({ queryKey: VoucherQueryKeys.listRoot() })

  if (listQueries.length <= max) return

  const sorted = [...listQueries].sort(
    (a, b) => a.state.dataUpdatedAt - b.state.dataUpdatedAt
  )

  const excess = sorted.slice(0, sorted.length - max)

  excess.forEach((q) => {
    queryClient.removeQueries({ queryKey: q.queryKey })
  })
}
