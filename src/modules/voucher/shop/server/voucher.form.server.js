import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createVoucherByShopAPI,
  updateVoucherByShopAPI,
  getVoucherFormSnapshotByShopAPI
} from '~/api/voucher.api'
import VoucherQueryKeys from '../policies/voucher.queryKeys'
import VoucherCachePolicy from '../policies/voucher.cache.policy'
import { StatusCodes } from 'http-status-codes'
import { invalidateAfterUpdateVoucher } from '../policies/voucher.invalidate.policy'

// ============================== QUERY ==============================
const useShopVoucherFormSnapshotQuery = ({ _id, isUpdate }) => {
  return useQuery({
    staleTime: VoucherCachePolicy.formSnapshot,
    enabled: Boolean(_id) && isUpdate,
    queryKey: VoucherQueryKeys.form(_id),
    queryFn: async () => {
      const { status, resData } = await getVoucherFormSnapshotByShopAPI({ _id })
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    }
  })
}

// ============================== MUTATION ==============================
const useShopCreateVoucherMutation = () => {
  return useMutation({
    mutationFn: async ({ payload }) => {
      const { status } = await createVoucherByShopAPI({ payload })
      if (status !== StatusCodes.CREATED) throw new Error()
      return
    },
    onSuccess: () => {}
  })
}

const useShopUpdateVoucherMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ _id, payload }) => {
      const { status } = await updateVoucherByShopAPI({ _id, payload })
      if (status !== StatusCodes.OK) throw new Error()
      console.log('success')
      return { _id }
    },
    onSuccess: (voucher) => {
      invalidateAfterUpdateVoucher(queryClient, voucher._id)
    }
  })
}

export {
  useShopVoucherFormSnapshotQuery,
  useShopCreateVoucherMutation,
  useShopUpdateVoucherMutation
}
