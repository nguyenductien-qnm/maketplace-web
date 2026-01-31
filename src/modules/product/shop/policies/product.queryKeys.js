const PRODUCT_ROOT = ['shop', 'product']

const ProductQueryKeys = {
  root: () => [...PRODUCT_ROOT],
  listRoot: () => [...PRODUCT_ROOT, 'list'],
  list: (filters) => [...PRODUCT_ROOT, 'list', filters],
  form: (_id) => [...PRODUCT_ROOT, 'form', _id],
  summary: () => [...PRODUCT_ROOT, 'summary'],
  detail: (_id) => [...PRODUCT_ROOT, 'detail', _id],
  auditLog: (_id) => [...PRODUCT_ROOT, 'audit-log', _id],
  revenue: (_id) => [...PRODUCT_ROOT, 'revenue', _id]
}

export default ProductQueryKeys
