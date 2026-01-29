const PRODUCT_ROOT = ['admin', 'product']

const ProductQueryKeys = {
  root: () => PRODUCT_ROOT,

  listRoot: () => [...PRODUCT_ROOT, 'list'],

  list: (filters) => [...PRODUCT_ROOT, 'list', filters],

  summary: () => [...PRODUCT_ROOT, 'summary'],

  detail: (_id) => [...PRODUCT_ROOT, 'detail', _id],

  auditLog: (_id) => [...PRODUCT_ROOT, 'audit-log', _id]
}

export default ProductQueryKeys
