const VOUCHER_ROOT = ['shop', 'voucher']

const VoucherQueryKeys = {
  root: () => [...VOUCHER_ROOT],
  listRoot: () => [...VOUCHER_ROOT, 'list'],
  list: (filters) => [...VOUCHER_ROOT, 'list', filters],
  form: (_id) => [...VOUCHER_ROOT, 'form', _id],
  summary: () => [...VOUCHER_ROOT, 'summary'],
  detail: (_id) => [...VOUCHER_ROOT, 'detail', _id],
  products: (_id) => [...VOUCHER_ROOT, 'products', _id],
  auditLog: (_id) => [...VOUCHER_ROOT, 'audit-log', _id]
}

export default VoucherQueryKeys
