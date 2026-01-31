const PRODUCT_TAB_LABELS = {
  ALL: 'All',
  PENDING: 'Pending',
  APPROVED_PUBLIC: 'Approved public',
  APPROVED_PRIVATE: 'Approved private',
  BANNED: 'Banned',
  REJECTED: 'Rejected'
}

const PRODUCT_TAB_KEYS = Object.keys(PRODUCT_TAB_LABELS)

const PRODUCT_TABLE_COLUMNS = [
  'Product(s)',
  'Price',
  'Stock',
  'Revenue',
  'Action'
]

const PRODUCT_DELETE_CONFIRM_DIALOG = {
  header: 'Confirm Deletion',
  content:
    'This action cannot be undone! Are you sure you want to permanently delete this product?',
  confirmText: 'Confirm',
  confirmColor: 'error'
}

export {
  PRODUCT_TAB_LABELS,
  PRODUCT_TAB_KEYS,
  PRODUCT_TABLE_COLUMNS,
  PRODUCT_DELETE_CONFIRM_DIALOG
}
