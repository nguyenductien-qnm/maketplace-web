export const createCategoryCacheActions = ({ queryKeys, queryClient }) => {
  const resetAll = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.root(),
      refetchType: 'active'
    })
  }

  return { resetAll }
}
