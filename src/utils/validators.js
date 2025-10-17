export const FIELD_REQUIRED_MESSAGE = 'This field is required.'
// ==================== email ============================
export const EMAIL_RULE = /^\S+@\S+\.\S+$/
export const EMAIL_RULE_MESSAGE = 'Email is invalid'

// ==================== password ============================
export const PASSWORD_RULE =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})/

export const PASSWORD_RULE_MESSAGE =
  'Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long.'
export const PASSWORD_CONFIRMATION_MESSAGE =
  'Password confirmation does not match!'
// ==================== product name ============================
export const PRODUCT_NAME_RULE = /^[A-Za-zÀ-ỹ0-9\s\-_,.():]{10,120}$/
export const PRODUCT_NAME_RULE_MESSAGE =
  'Product name: 10-120 characters, alphanumeric and basic punctuation only.'
// ==================== product name ============================
export const PRODUCT_TAG_RULE = /^[A-Za-zÀ-ỹ0-9\s-]{1,20}$/
export const PRODUCT_TAG_RULE_MESSAGE =
  'Each tag must be 1-20 characters and contain letters, numbers, spaces, and hyphens only.'
// ==================== product attribute key ============================
export const PRODUCT_ATTRIBUTE_KEY_RULE = /^[A-Za-zÀ-ỹ0-9,\s]{1,20}$/
export const PRODUCT_ATTRIBUTE_KEY_MESSAGE =
  'Max 20 chars: letters, numbers, commas'
// ==================== product price ============================
export const PRODUCT_PRICE_MIN = 0
export const PRODUCT_PRICE_MAX = 2000
export const PRODUCT_PRICE_MESSAGE =
  'Price must be greater than $0 and less than $2,000 USD'

// ==================== product stock ============================
export const PRODUCT_STOCK_MIN = 1
export const PRODUCT_STOCK_MAX = 10000000
export const PRODUCT_STOCK_MESSAGE =
  'Stock must be between 1 and 10,000,000 units'

// ==================== product attribute value ============================
export const PRODUCT_ATTRIBUTE_VALUE_RULE = /^[A-Za-zÀ-ỹ0-9,\s]{1,50}$/
export const PRODUCT_ATTRIBUTE_VALUE_MESSAGE =
  'Max 50 chars: letters, numbers, commas'

// Variation validation
export const PRODUCT_VARIATION_NAME_RULE = /^[A-Za-zÀ-ỹ0-9\s]{1,14}$/
export const PRODUCT_VARIATION_NAME_MESSAGE =
  'Variation name: max 14 chars (letters, numbers, spaces)'

// Option validation
export const PRODUCT_VARIATION_OPTION_RULE = /^[A-Za-zÀ-ỹ0-9\s-]{1,20}$/
export const PRODUCT_VARIATION_OPTION_MESSAGE =
  'Option name: max 20 chars (letters, numbers, spaces, hyphen "-")'

// Variation constraints
export const MAX_VARIATIONS = 2
export const MAX_TOTAL_VARIANTS = 96

// ==================== name ============================
export const NAME_RULE = /^[A-Za-zÀ-ỹà-ỹ\s]{3,50}$/
export const NAME_RULE_MESSAGE =
  'Please enter a valid name (3-50 letters and spaces only).'

// ==================== national ID ============================
export const NATIONAL_ID_RULE = /^[0-9]{12}$/
export const NATIONAL_ID_MESSAGE =
  'Please enter a valid National ID (exactly 12 digits).'

// ==================== national ID ============================
export const TAX_CODE_RULE = /^\d{10}(-\d{3})?$/
export const TAX_CODE_MESSAGE = 'Tax code must be 10 digits or 10 digits-xxx.'

// ==================== category name ============================
export const CATEGORY_NAME_RULE = /^[A-Za-zÀ-ỹà-ỹ\s&',’\-]{3,50}$/
export const CATEGORY_NAME_RULE_MESSAGE =
  'Please enter a valid name (3-50 letters, spaces, and "&" only).'

// ==================== category code ============================
export const CATEGORY_CODE_RULE = /^[A-Z_]{3,30}$/
export const CATEGORY_CODE_RULE_MESSAGE =
  'Please enter a valid code (3–30 uppercase letters and underscores only).'

// ==================== reason ============================
export const REASON_RULE = /^.{5,255}$/
export const REASON_RULE_MESSAGE =
  'Reason must be between 5 and 255 characters.'

// ==================== phone ============================
export const PHONE_RULE = /^\d{10}$/
export const PHONE_RULE_MESSAGE = 'Invalid phone.'

// ==================== number ============================
export const NUMBER_RULE = /^\d+$/
export const NUMBER_RULE_MESSAGE = 'Only numbers are allowed.'

export const POSITIVE_NUMBER_RULE = /^(?!0+(?:\.0+)?$)\d+(\.\d+)?$/
export const POSITIVE_NUMBER_RULE_MESSAGE = 'Positive number only.'
// ==================== voucher code ============================
export const VOUCHER_CODE_RULE = /^[A-Za-z0-9]{8}$/
export const VOUCHER_CODE_RULE_MESSAGE =
  'Voucher code must contain only letters (A-Z, a-z) and hyphens (-), with exactly 8 characters.'

// ==================== file ============================
export const LIMIT_COMMON_FILE_SIZE = 10485760 // byte = 10 MB
export const ALLOW_COMMON_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']
export const singleFileValidator = (file) => {
  if (!file || !file.name || !file.size || !file.type) {
    return 'File cannot be blank.'
  }
  if (file.size > LIMIT_COMMON_FILE_SIZE) {
    return 'Maximum file size exceeded. (10MB)'
  }
  if (!ALLOW_COMMON_FILE_TYPES.includes(file.type)) {
    return 'File type is invalid. Only accept jpg, jpeg and png'
  }
  return null
}
