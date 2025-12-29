const VOUCHER_PAGE_TITLE = {
  ONGOING: 'Ongoing Vouchers',
  UPCOMING: 'Upcoming Vouchers',
  EXPIRED: 'Expired Vouchers',
  BANNED: 'Banned Vouchers',
  ALL: 'All Vouchers',
  ACTIVE: 'Active Vouchers',
  DISABLED: 'Disable Vouchers'
}

const VOUCHER_TABLE_COLUMNS = [
  'Creator By',
  'Code',
  'Type',
  'Visibility',
  'Active',
  'Active Period',
  'Quantity',
  'Used',
  'Value',
  'Action'
]

const VOUCHER_REASON_CONTENT = {
  ban: {
    header: 'Ban Shop Voucher',
    submitText: 'Confirm',
    submitColor: 'error'
  },
  unban: {
    header: 'Unban Shop Voucher',
    submitText: 'Confirm',
    submitColor: 'success'
  }
}

const VOUCHER_CREATOR_ROLE_COLOR = {
  shop: '#1976d2',
  admin: '#d32f2f'
}

const VOUCHER_FORM_TITLE = {
  create: 'Create Voucher',
  update: 'Update Voucher'
}

export {
  VOUCHER_PAGE_TITLE,
  VOUCHER_TABLE_COLUMNS,
  VOUCHER_CREATOR_ROLE_COLOR,
  VOUCHER_REASON_CONTENT,
  VOUCHER_FORM_TITLE
}
