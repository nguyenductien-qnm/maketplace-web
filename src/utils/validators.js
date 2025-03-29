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

// ==================== name ============================
export const NAME_RULE = /^[a-zA-ZÀ-ỹ0-9\s.,()\-]{3,255}$/
export const NAME_RULE_MESSAGE = 'Invalid name'

// ==================== phone ============================
export const PHONE_RULE = /^\d{10}$/
export const PHONE_RULE_MESSAGE = 'Invalid phone.'

export const NUMBER_RULE = /^\d+$/
export const NUMBER_RULE_MESSAGE = 'Only numbers are allowed.'

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
