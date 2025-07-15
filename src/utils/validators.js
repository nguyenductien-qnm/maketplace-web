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
export const PRODUCT_NAME_RULE = /^[A-Za-zÀ-ỹ0-9\s\-_,.()]{3,255}$/
export const PRODUCT_NAME_RULE_MESSAGE =
  'Product name can only contain letters, numbers, spaces, hyphens, underscores, commas, periods, and parentheses, and must be between 3 and 255 characters long.'
// ==================== name ============================
export const NAME_RULE = /^[A-Za-zÀ-ỹà-ỹ\s]{3,50}$/
export const NAME_RULE_MESSAGE =
  'Please enter a valid name (3-50 letters and spaces only).'

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
