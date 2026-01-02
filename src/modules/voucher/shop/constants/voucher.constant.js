const VOUCHER_TAB_LABELS = {
  ALL: 'All',
  ACTIVE: 'Active',
  ONGOING: 'Ongoing',
  UPCOMING: 'Upcoming',
  EXPIRED: 'Expired',
  DISABLED: 'Disabled',
  BANNED: 'Banned'
}

const VOUCHER_TABLE_COLUMNS = [
  'Name',
  'Apply',
  'Value',
  'Quantity',
  'Used',
  'Time',
  'Enabled',
  'Action'
]

const VOUCHER_STATUS_CHIP_CONFIG = {
  UPCOMING: { label: 'Upcoming', color: '#ff9800' },
  ONGOING: { label: 'Ongoing', color: '#4caf50' },
  EXPIRED: { label: 'Expired', color: '#f44336' }
}

const VOUCHER_TYPE_IMAGE_MAP = {
  percent:
    'https://deo.shopeemobile.com/shopee/shopee-seller-live-sg/mmf_portal_seller_root_dir/static/modules/vouchers-v2/image/percent-colorful.0e15568.png',
  fixed_amount:
    'https://deo.shopeemobile.com/shopee/shopee-seller-live-sg/mmf_portal_seller_root_dir/static/modules/vouchers-v2/image/dollar-colorful.5e618d0.png'
}

const VOUCHER_TAB_KEYS = Object.keys(VOUCHER_TAB_LABELS)

export {
  VOUCHER_TAB_LABELS,
  VOUCHER_TAB_KEYS,
  VOUCHER_TABLE_COLUMNS,
  VOUCHER_STATUS_CHIP_CONFIG,
  VOUCHER_TYPE_IMAGE_MAP
}
