const VOUCHER_FORM_DEFAULT_VALUES = {
  voucher_name: '',
  voucher_code: '',
  voucher_start_date: '',
  voucher_end_date: '',
  voucher_type: 'fixed_amount',
  voucher_visibility: 'public',
  voucher_apply: 'all',
  voucher_value: '',
  voucher_quantity: '',
  voucher_min_order_value: '',
  voucher_max_distribution_per_buyer: ''
}

const VOUCHER_STATUS_ALERT_COLOR = {
  ONGOING: 'success',
  UPCOMING: 'warning',
  EXPIRED: 'error'
}

const VOUCHER_BASIC_INFORMATION = {
  LABELS: {
    TITLE: 'Basic Information',
    VOUCHER_NAME: 'Voucher Name',
    VOUCHER_CODE: 'Voucher Code',
    VOUCHER_START_DATE: 'Voucher Start Date & Time',
    VOUCHER_END_DATE: 'Voucher End Date & Time'
  },
  HELP_TEXT: {
    VOUCHER_NAME: 'Voucher name is not visible to buyers.',
    VOUCHER_CODE: 'Please enter A-Z, 0-9; 10 characters maximum.'
  }
}

const VOUCHER_DISCOUNT_SETTING = {
  LABELS: {
    TITLE: 'Discount Setting',
    VOUCHER_TYPE: 'Voucher Type',
    VOUCHER_MAX_DISCOUNT: 'Max Discount Amount',
    VOUCHER_VALUE: 'Voucher Value',
    VOUCHER_QUANTITY: 'Voucher Quantity',
    VOUCHER_MAX_DISTRIBUTE: 'Max Distribution per Buyer',
    VOUCHER_MIN_ORDER_VALUE: 'Minimum Order Value'
  }
}

const VOUCHER_APPLICABLE = {
  LABELS: {
    TITLE: 'Applicable & Visibility',
    VOUCHER_APPLY: 'Voucher Apply',
    VOUCHER_VISIBILITY: 'Voucher Visibility'
  }
}

export {
  VOUCHER_FORM_DEFAULT_VALUES,
  VOUCHER_STATUS_ALERT_COLOR,
  VOUCHER_BASIC_INFORMATION,
  VOUCHER_DISCOUNT_SETTING,
  VOUCHER_APPLICABLE
}
