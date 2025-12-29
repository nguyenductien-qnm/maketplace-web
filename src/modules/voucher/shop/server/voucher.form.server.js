import { useQuery, useMutation } from '@tanstack/react-query'
import {
  getVoucherDetailByShopAPI,
  createVoucherByShopAPI,
  updateVoucherByShopAPI
} from '~/api/voucher.api'

export const useShopVoucherFormServer = ({ _id, isUpdate }) => {
  const detailQuery = useQuery({
    queryKey: ['shop-voucher-form', _id],
    queryFn: () => getVoucherDetailByShopAPI({ _id }),
    enabled: isUpdate,
    staleTime: 5 * 60 * 1000
  })

  const createMutation = useMutation({
    mutationFn: ({ payload, loadingClass }) =>
      createVoucherByShopAPI({ payload, loadingClass })
  })

  const updateMutation = useMutation({
    mutationFn: ({ _id, payload, loadingClass }) =>
      updateVoucherByShopAPI({ _id, payload, loadingClass })
  })

  return {
    detailQuery,
    createMutation,
    updateMutation
  }
}
