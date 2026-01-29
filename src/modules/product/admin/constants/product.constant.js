const PRODUCT_PAGE_TITLE = {
  ALL: 'All Products',
  PENDING: 'Pending Products',
  APPROVED_PUBLIC: 'Approved Public Products',
  APPROVED_PRIVATE: 'Approved Private Products',
  BANNED: 'Banned Products',
  REJECTED: 'Rejected Products'
}

const PRODUCT_TABLE_COLUMNS = [
  'Product',
  'Creator',
  'Price',
  'Stock',
  'Type',
  'Status',
  'Visibility',
  'Action'
]

const PRODUCT_REASON_CONTENT = {
  ban: {
    header: 'Ban Product',
    submitText: 'Confirm',
    submitColor: 'error'
  },
  unban: {
    header: 'Unban Product',
    submitText: 'Confirm',
    submitColor: 'success'
  },
  reject: {
    header: 'Reject Product',
    submitText: 'Confirm',
    submitColor: 'success'
  }
}

export { PRODUCT_PAGE_TITLE, PRODUCT_TABLE_COLUMNS, PRODUCT_REASON_CONTENT }
