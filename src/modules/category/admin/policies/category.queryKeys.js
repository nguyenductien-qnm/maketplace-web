const CATEGORY_ROOT = ['admin', 'category']

const CategoryQueryKeys = {
  root: () => CATEGORY_ROOT,

  list: () => [...CATEGORY_ROOT, 'list'],

  summary: () => [...CATEGORY_ROOT, 'summary'],

  detail: (_id) => [...CATEGORY_ROOT, 'detail', _id],

  form: (_id) => [...CATEGORY_ROOT, 'form', _id],

  products: (_id) => [...CATEGORY_ROOT, 'products', _id],

  auditLog: (_id) => [...CATEGORY_ROOT, 'audit-log', _id]
}

export default CategoryQueryKeys
