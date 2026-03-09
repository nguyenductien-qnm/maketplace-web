import {
  createProductByShopAPI,
  updateProductByShopAPI
} from '~/api/product.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useShopCreateProductMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ payload }) => {
      const { status } = await createProductByShopAPI({ payload })
      if (status !== StatusCodes.OK) throw new Error()
      return
    },
    onSuccess: () => {}
  })
}

const useShopUpdateProductMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ payload }) => {
      const { status } = await updateProductByShopAPI({ payload })
      if (status !== StatusCodes.OK) throw new Error()
      return
    },
    onSuccess: () => {}
  })
}

export { useShopCreateProductMutation, useShopUpdateProductMutation }
