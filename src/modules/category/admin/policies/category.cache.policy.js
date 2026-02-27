const CategoryCachePolicy = {
  list: 1 * 60 * 1000,
  summary: 5 * 60 * 1000,
  detail: 2 * 60 * 1000,
  formSnapshot: 2 * 60 * 1000,
  auditLog: Infinity
}

export default CategoryCachePolicy
